import { Injectable, Logger } from '@nestjs/common';
import { ProviderDispatchOutboxStatus } from '@transactions/models';
import { ProviderDispatchOutboxRepository } from '@transactions/repositories';
import { ProviderDispatchQueueService } from './provider-dispatch-queue.service';

@Injectable()
export class ProviderDispatchOutboxService {
  private readonly logger = new Logger(ProviderDispatchOutboxService.name);

  constructor(
    private readonly outboxRepository: ProviderDispatchOutboxRepository,
    private readonly queueService: ProviderDispatchQueueService,
  ) {}

  async tryEnqueue(outboxId: string): Promise<boolean> {
    const outbox = await this.outboxRepository.findById(outboxId);
    if (!outbox) {
      return false;
    }

    if (outbox.status === ProviderDispatchOutboxStatus.Enqueued) {
      return true;
    }

    try {
      await this.queueService.enqueue(outbox);
      await this.outboxRepository.markEnqueued(outbox.id);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await this.outboxRepository.recordFailure(outbox.id, message);
      this.logger.warn(
        `Failed to enqueue provider dispatch outbox ${outbox.id}: ${message}`,
      );
      return false;
    }
  }
}
