import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, QueryFailedError } from 'typeorm';
import {
  OfferInputField,
  OfferStatus,
  parseOfferInputSchema,
  ProductType,
} from '@products/models';
import { OfferRepository } from '@products/repositories';
import { WalletService } from '@wallets/services';
import {
  ProviderDispatchOutbox,
  Transaction,
  TransactionStatus,
} from '@transactions/models';
import {
  ProviderDispatchOutboxRepository,
  TransactionRepository,
} from '@transactions/repositories';
import { generateTransactionId } from '@transactions/utils';
import {
  MOBILE_TOPUP_MSISDN_PATTERN,
  MOBILE_TOPUP_PRODUCT_PREFIXES,
} from './mobile-topup.constants';
import {
  FULFILL_TRANSACTION_JOB_NAME,
  PROVIDER_DISPATCH_QUEUE_NAME,
} from './provider-dispatch.constants';
import { ProviderDispatchOutboxService } from './provider-dispatch-outbox.service';

export interface CreateMobileTopupTransactionInput {
  userId: string;
  offerId: string;
  msisdn: string;
  amount: number;
  externalId?: string;
}

export interface CreatedMobileTopupTransaction {
  transaction: Transaction;
  outbox: ProviderDispatchOutbox;
}

@Injectable()
export class CreateMobileTopupTransactionService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly offerRepository: OfferRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly outboxRepository: ProviderDispatchOutboxRepository,
    private readonly walletService: WalletService,
    private readonly outboxService: ProviderDispatchOutboxService,
  ) {}

  async create(
    input: CreateMobileTopupTransactionInput,
  ): Promise<CreatedMobileTopupTransaction> {
    const offer = await this.offerRepository.findByIdWithProduct(input.offerId);
    if (
      !offer ||
      offer.status !== OfferStatus.Active ||
      offer.product.type !== ProductType.MobileTopup
    ) {
      throw new NotFoundException('Offer not found');
    }

    const inputSchema = parseOfferInputSchema(offer.inputSchema);
    this.validateAmount(input.amount, inputSchema.fields);
    this.validateMsisdn(input.msisdn, offer.product.code);

    if (input.externalId) {
      const externalIdExists =
        await this.transactionRepository.existsByExternalId(
          input.userId,
          input.externalId,
        );
      if (externalIdExists) {
        throw new ConflictException('externalId already exists');
      }
    }

    const transactionId = generateTransactionId();

    try {
      const created = await this.dataSource.transaction(async (manager) => {
        const transaction = await this.transactionRepository.createTransaction(
          {
            id: transactionId,
            userId: input.userId,
            offerId: offer.id,
            productId: offer.product.id,
            productCode: offer.product.code,
            status: TransactionStatus.Confirmed,
            amount: input.amount,
            currency: 'DZD',
            externalId: input.externalId ?? null,
            inputs: { msisdn: input.msisdn },
            failureReason: null,
          },
          manager,
        );

        await this.walletService.reserveFundsForTransaction(
          input.userId,
          transaction.id,
          input.amount,
          manager,
        );

        const outbox = await this.outboxRepository.createEntry(
          {
            transactionId: transaction.id,
            queueName: PROVIDER_DISPATCH_QUEUE_NAME,
            jobName: FULFILL_TRANSACTION_JOB_NAME,
            payload: { transactionId: transaction.id },
          },
          manager,
        );

        return { transaction, outbox };
      });

      await this.outboxService.tryEnqueue(created.outbox.id);
      return created;
    } catch (err) {
      if (isUniqueConstraintError(err)) {
        throw new ConflictException('externalId already exists');
      }
      throw err;
    }
  }

  private validateAmount(amount: number, fields: OfferInputField[]): void {
    const amountField = fields.find((field) => field.name === 'amount');
    const min = amountField?.constraints.min;
    const max = amountField?.constraints.max;
    const currency = amountField?.constraints.currency;

    if (
      !Number.isInteger(amount) ||
      typeof min !== 'number' ||
      typeof max !== 'number' ||
      currency !== 'DZD' ||
      amount < min ||
      amount > max
    ) {
      throw new BadRequestException('Amount is outside offer constraints');
    }
  }

  private validateMsisdn(msisdn: string, productCode: string): void {
    if (!MOBILE_TOPUP_MSISDN_PATTERN.test(msisdn)) {
      throw new BadRequestException('MSISDN must be an Algerian E.164 number');
    }

    const prefixes = MOBILE_TOPUP_PRODUCT_PREFIXES[productCode];
    if (!prefixes || !prefixes.some((prefix) => msisdn.startsWith(prefix))) {
      throw new BadRequestException(
        'MSISDN mobile network prefix does not match offer',
      );
    }
  }
}

function isUniqueConstraintError(err: unknown): boolean {
  if (!(err instanceof QueryFailedError)) {
    return false;
  }

  const driverError = err.driverError as unknown;
  return isRecord(driverError) && driverError.code === '23505';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
