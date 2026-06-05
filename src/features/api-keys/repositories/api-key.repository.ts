import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { ApiKey, ApiKeyMode } from '@api-keys/models';

export interface CreateApiKeyRecord {
  id: string;
  userId: string;
  name: string;
  keyPreview: string;
  secretHash: string;
  mode: ApiKeyMode;
}

@Injectable()
export class ApiKeyRepository extends Repository<ApiKey> {
  constructor(private readonly dataSource: DataSource) {
    super(ApiKey, dataSource.createEntityManager());
  }

  async createApiKey(input: CreateApiKeyRecord): Promise<ApiKey> {
    const apiKey = this.create({
      ...input,
      lastUsedAt: null,
      revokedAt: null,
    });
    return this.save(apiKey);
  }

  findActiveById(id: string): Promise<ApiKey | null> {
    return this.findOne({
      where: { id, revokedAt: IsNull() },
      relations: { user: true },
    });
  }

  findActiveByUserId(userId: string): Promise<ApiKey[]> {
    return this.find({
      where: { userId, revokedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async markLastUsed(id: string, lastUsedAt: Date): Promise<void> {
    await this.update({ id }, { lastUsedAt });
  }

  async revokeForUser(id: string, userId: string): Promise<boolean> {
    const result = await this.update(
      { id, userId, revokedAt: IsNull() },
      { revokedAt: new Date() },
    );
    return (result.affected ?? 0) > 0;
  }
}
