import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { UserRoles } from '@common/enums';
import { HashingService } from '@core/hashing';
import { Offer, OfferStatus, Product, ProductType } from '@products/models';
import { User } from '@users/models';
import {
  Wallet,
  WalletLedgerEntry,
  WalletLedgerEntryType,
} from '@wallets/models';

interface SigninResponseBody {
  accessToken: string;
}

interface CreateUserResponseBody {
  id: string;
}

interface AccountBalanceResponseBody {
  availableBalance: number;
  reservedBalance: number;
  totalBalance: number;
  currency: string;
  updatedAt: string;
}

interface CreateApiKeyResponseBody {
  id: string;
  name: string;
  keyPreview: string;
  mode: string;
  apiKey: string;
  createdAt: string;
}

interface ListApiKeysResponseBody {
  apiKeys: Array<{
    id: string;
    name: string;
    keyPreview: string;
    mode: string;
    lastUsedAt: string | null;
    createdAt: string;
  }>;
}

interface ListOffersResponseBody {
  offers: Array<{
    id: string;
    code: string;
    status: string;
    product: {
      id: string;
      code: string;
      name: string;
      type: string;
    };
    inputSchema: {
      version: number;
      fields: Array<{
        name: string;
        type: string;
        required: boolean;
        constraints: Record<string, string | number | boolean>;
      }>;
    };
  }>;
}

jest.setTimeout(30000);

describe('Wallet and account flows (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;
  let hashing: HashingService;

  const password = 'strongPassword123';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    dataSource = app.get(DataSource);
    hashing = app.get(HashingService);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  function uniqueEmail(label: string): string {
    const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${label}.${suffix}@example.com`;
  }

  async function seedUser(role: UserRoles, withWallet = false): Promise<User> {
    const userRepository = dataSource.getRepository(User);
    const user = userRepository.create({
      email: uniqueEmail(role.toLowerCase()),
      password: await hashing.hash(password),
      role,
    });
    await userRepository.save(user);

    if (withWallet) {
      await dataSource.getRepository(Wallet).save(
        dataSource.getRepository(Wallet).create({
          userId: user.id,
          currency: 'DZD',
          availableBalance: 0,
          reservedBalance: 0,
        }),
      );
    }

    return user;
  }

  async function signIn(user: User): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/users/signin')
      .send({ email: user.email, password })
      .expect(200);

    const body = response.body as SigninResponseBody;
    return body.accessToken;
  }

  function uniqueCatalogId(prefix: 'prd' | 'off'): string {
    const suffix = `${Date.now().toString(16)}${Math.random()
      .toString(16)
      .slice(2)}`.slice(0, 16);
    return `${prefix}_${suffix.padEnd(16, '0')}`;
  }

  function expectedMobileTopupInputSchema() {
    return {
      version: 1,
      fields: [
        {
          name: 'msisdn',
          type: 'string',
          required: true,
          constraints: { format: 'DZ_E164_MSISDN' },
        },
        {
          name: 'amount',
          type: 'integer',
          required: true,
          constraints: { min: 100, max: 10000, currency: 'DZD' },
        },
      ],
    };
  }

  async function createAdminManagedUser(
    adminToken: string,
    role: UserRoles,
  ): Promise<User> {
    const email = uniqueEmail(role.toLowerCase());
    const response = await request(app.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email, password, role })
      .expect(201);

    const body = response.body as CreateUserResponseBody;
    expect(body.id).toMatch(/^usr_[0-9a-f]{16}$/);

    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ id: body.id });
    expect(user.email).toBe(email);
    expect(user.role).toBe(role);
    return user;
  }

  it('removes public signup from the API surface', async () => {
    await request(app.getHttpServer())
      .post('/users/signup')
      .send({ email: uniqueEmail('signup'), password })
      .expect(404);
  });

  it('allows an ADMIN to create REGULAR users and creates a zero wallet', async () => {
    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);

    const createdUser = await createAdminManagedUser(
      adminToken,
      UserRoles.REGULAR,
    );
    const createdUserToken = await signIn(createdUser);

    const accountResponse = await request(app.getHttpServer())
      .get('/account')
      .set('Authorization', `Bearer ${createdUserToken}`)
      .expect(200);

    const accountBody = accountResponse.body as AccountBalanceResponseBody;
    expect(accountBody).toMatchObject({
      availableBalance: 0,
      reservedBalance: 0,
      totalBalance: 0,
      currency: 'DZD',
    });
    expect(typeof accountBody.updatedAt).toBe('string');
  });

  it('allows an ADMIN to create another ADMIN without creating a wallet', async () => {
    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);

    const createdAdmin = await createAdminManagedUser(
      adminToken,
      UserRoles.ADMIN,
    );

    const wallet = await dataSource
      .getRepository(Wallet)
      .findOneBy({ userId: createdAdmin.id });
    expect(wallet).toBeNull();
  });

  it('rejects legacy OWNER role values', async () => {
    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);

    await request(app.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email: uniqueEmail('blocked-owner'),
        password,
        role: 'OWNER',
      })
      .expect(400);
  });

  it('rejects admin user creation by non-ADMIN users', async () => {
    const regular = await seedUser(UserRoles.REGULAR, true);
    const regularToken = await signIn(regular);

    await request(app.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${regularToken}`)
      .send({
        email: uniqueEmail('blocked'),
        password,
        role: UserRoles.REGULAR,
      })
      .expect(403);
  });

  it('creates deposits, updates account balance, and writes a ledger entry', async () => {
    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);
    const clientUser = await createAdminManagedUser(
      adminToken,
      UserRoles.REGULAR,
    );
    const clientToken = await signIn(clientUser);

    await request(app.getHttpServer())
      .post(`/admin/users/${clientUser.id}/deposits`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 2500, note: 'Initial funding' })
      .expect(201)
      .expect({ message: 'Deposit created successfully' });

    const accountResponse = await request(app.getHttpServer())
      .get('/account')
      .set('Authorization', `Bearer ${clientToken}`)
      .expect(200);

    const accountBody = accountResponse.body as AccountBalanceResponseBody;
    expect(accountBody).toMatchObject({
      availableBalance: 2500,
      reservedBalance: 0,
      totalBalance: 2500,
      currency: 'DZD',
    });
    expect(typeof accountBody.updatedAt).toBe('string');

    const ledgerEntry = await dataSource
      .getRepository(WalletLedgerEntry)
      .findOneOrFail({
        where: {
          userId: clientUser.id,
          type: WalletLedgerEntryType.DEPOSIT,
        },
        order: { createdAt: 'DESC' },
      });

    expect(ledgerEntry).toMatchObject({
      userId: clientUser.id,
      type: WalletLedgerEntryType.DEPOSIT,
      amount: 2500,
      currency: 'DZD',
      availableBalanceDelta: 2500,
      reservedBalanceDelta: 0,
      availableBalanceAfter: 2500,
      reservedBalanceAfter: 0,
      actorUserId: admin.id,
      note: 'Initial funding',
    });
  });

  it('rejects deposits by non-ADMIN users', async () => {
    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);
    const regularActor = await createAdminManagedUser(
      adminToken,
      UserRoles.REGULAR,
    );
    const targetUser = await createAdminManagedUser(
      adminToken,
      UserRoles.REGULAR,
    );
    const regularToken = await signIn(regularActor);

    await request(app.getHttpServer())
      .post(`/admin/users/${targetUser.id}/deposits`)
      .set('Authorization', `Bearer ${regularToken}`)
      .send({ amount: 500 })
      .expect(403);
  });

  it('returns 404 when an authenticated user has no wallet', async () => {
    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);
    const userWithoutWallet = await seedUser(UserRoles.REGULAR);
    const userWithoutWalletToken = await signIn(userWithoutWallet);

    await request(app.getHttpServer())
      .get('/account')
      .set('Authorization', `Bearer ${userWithoutWalletToken}`)
      .expect(404);

    await request(app.getHttpServer())
      .post(`/admin/users/${userWithoutWallet.id}/deposits`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 500 })
      .expect(404);
  });

  it('lists active catalog offers with embedded product summaries', async () => {
    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);
    const clientUser = await createAdminManagedUser(
      adminToken,
      UserRoles.REGULAR,
    );
    const clientToken = await signIn(clientUser);

    const response = await request(app.getHttpServer())
      .get('/offers')
      .set('Authorization', `Bearer ${clientToken}`)
      .expect(200);

    const body = response.body as ListOffersResponseBody;
    expect(body.offers).toEqual([
      {
        id: 'off_0000000000000002',
        code: 'prepaid',
        status: OfferStatus.Active,
        product: {
          id: 'prd_0000000000000002',
          code: 'djezzy',
          name: 'Djezzy',
          type: ProductType.MobileTopup,
        },
        inputSchema: expectedMobileTopupInputSchema(),
      },
      {
        id: 'off_0000000000000001',
        code: 'prepaid',
        status: OfferStatus.Active,
        product: {
          id: 'prd_0000000000000001',
          code: 'mobilis',
          name: 'Mobilis',
          type: ProductType.MobileTopup,
        },
        inputSchema: expectedMobileTopupInputSchema(),
      },
      {
        id: 'off_0000000000000003',
        code: 'prepaid',
        status: OfferStatus.Active,
        product: {
          id: 'prd_0000000000000003',
          code: 'ooredoo',
          name: 'Ooredoo',
          type: ProductType.MobileTopup,
        },
        inputSchema: expectedMobileTopupInputSchema(),
      },
    ]);
  });

  it('hides inactive offers from catalog reads', async () => {
    const productRepository = dataSource.getRepository(Product);
    const offerRepository = dataSource.getRepository(Offer);
    const product = await productRepository.save(
      productRepository.create({
        id: uniqueCatalogId('prd'),
        code: `inactive-${Math.random().toString(16).slice(2)}`,
        name: 'Inactive Provider',
        type: ProductType.MobileTopup,
      }),
    );
    await offerRepository.save(
      offerRepository.create({
        id: uniqueCatalogId('off'),
        productId: product.id,
        code: 'prepaid',
        status: OfferStatus.Inactive,
        inputSchema: expectedMobileTopupInputSchema(),
      }),
    );

    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);
    const clientUser = await createAdminManagedUser(
      adminToken,
      UserRoles.REGULAR,
    );
    const clientToken = await signIn(clientUser);

    const response = await request(app.getHttpServer())
      .get('/offers')
      .set('Authorization', `Bearer ${clientToken}`)
      .expect(200);

    const body = response.body as ListOffersResponseBody;
    expect(body.offers.some((offer) => offer.product.id === product.id)).toBe(
      false,
    );
  });

  it('rejects unauthenticated catalog reads and removed legacy product routes', async () => {
    await request(app.getHttpServer()).get('/offers').expect(401);
    await request(app.getHttpServer()).get('/products').expect(404);
    await request(app.getHttpServer()).get('/products/prd_missing').expect(404);
    await request(app.getHttpServer()).post('/products').send({}).expect(404);
  });

  it('returns keyPreview metadata and accepts the raw key with ApiKey auth', async () => {
    const admin = await seedUser(UserRoles.ADMIN);
    const adminToken = await signIn(admin);
    const clientUser = await createAdminManagedUser(
      adminToken,
      UserRoles.REGULAR,
    );
    const clientToken = await signIn(clientUser);

    const createApiKeyResponse = await request(app.getHttpServer())
      .post('/account/api-keys')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ name: 'Mobile app integration' })
      .expect(201);

    const createBody = createApiKeyResponse.body as CreateApiKeyResponseBody;
    expect(createBody.id).toMatch(/^apk_[0-9a-f]{16}$/);
    expect(createBody.name).toBe('Mobile app integration');
    expect(createBody.apiKey.startsWith(createBody.keyPreview)).toBe(true);
    expect(
      Buffer.from(createBody.keyPreview.slice(8), 'base64url').toString('utf8'),
    ).toBe(`${createBody.id}.`);
    expect(createBody).not.toHaveProperty('keyPrefix');

    const listApiKeysResponse = await request(app.getHttpServer())
      .get('/account/api-keys')
      .set('Authorization', `Bearer ${clientToken}`)
      .expect(200);

    const listBody = listApiKeysResponse.body as ListApiKeysResponseBody;
    expect(listBody.apiKeys).toEqual([
      expect.objectContaining({
        id: createBody.id,
        name: 'Mobile app integration',
        keyPreview: createBody.keyPreview,
      }),
    ]);

    await request(app.getHttpServer())
      .get('/account')
      .set('Authorization', `ApiKey ${createBody.apiKey}`)
      .expect(200);

    const offersResponse = await request(app.getHttpServer())
      .get('/offers')
      .set('Authorization', `ApiKey ${createBody.apiKey}`)
      .expect(200);

    const offersBody = offersResponse.body as ListOffersResponseBody;
    expect(offersBody.offers).toHaveLength(3);
  });
});
