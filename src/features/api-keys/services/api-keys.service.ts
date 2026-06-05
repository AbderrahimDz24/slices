import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as config from '@nestjs/config';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { UserRoles } from '@common/enums';
import { ApiKey, ApiKeyMode } from '@api-keys/models';
import { ApiKeyRepository } from '@api-keys/repositories';
import { generateApiKeyId } from '@api-keys/utils';
import apiKeyConfig from '../core/api-key.config';

export interface CreatedApiKey {
  apiKey: ApiKey;
  rawKey: string;
}

interface ParsedApiKey {
  mode: ApiKeyMode;
  keyId: string;
  secret: string;
}

@Injectable()
export class ApiKeysService {
  private static readonly encodedPayloadPattern = /^[A-Za-z0-9_-]+$/;
  private static readonly keyIdPattern = /^apk_[a-f0-9]{16}$/;
  private static readonly secretPattern = /^[A-Za-z0-9_-]{43}$/;

  constructor(
    private readonly apiKeyRepository: ApiKeyRepository,
    @Inject(apiKeyConfig.KEY)
    private readonly apiKeyConfiguration: config.ConfigType<
      typeof apiKeyConfig
    >,
  ) {}

  async createApiKey(userId: string, name: string): Promise<CreatedApiKey> {
    const keyId = generateApiKeyId();
    const secret = this.generateSecret();
    const rawKey = this.formatRawKey(keyId, secret);
    const apiKey = await this.apiKeyRepository.createApiKey({
      id: keyId,
      userId,
      name,
      keyPreview: this.formatKeyPreview(keyId),
      secretHash: this.hashSecret(secret),
      mode: this.apiKeyConfiguration.mode,
    });

    return { apiKey, rawKey };
  }

  listActiveApiKeys(userId: string): Promise<ApiKey[]> {
    return this.apiKeyRepository.findActiveByUserId(userId);
  }

  async revokeApiKey(userId: string, id: string): Promise<void> {
    const revoked = await this.apiKeyRepository.revokeForUser(id, userId);
    if (!revoked) {
      throw new NotFoundException('API key not found');
    }
  }

  async validateSubmittedKey(rawKey: string): Promise<ApiKey | null> {
    const parsed = this.parseRawKey(rawKey);
    if (!parsed || parsed.mode !== this.apiKeyConfiguration.mode) {
      return null;
    }

    const apiKey = await this.apiKeyRepository.findActiveById(parsed.keyId);
    if (
      !apiKey ||
      apiKey.mode !== parsed.mode ||
      apiKey.user.role !== UserRoles.REGULAR ||
      !this.verifySecret(parsed.secret, apiKey.secretHash)
    ) {
      return null;
    }

    const lastUsedAt = new Date();
    await this.apiKeyRepository.markLastUsed(apiKey.id, lastUsedAt);
    apiKey.lastUsedAt = lastUsedAt;

    return apiKey;
  }

  parseRawKey(rawKey: string): ParsedApiKey | null {
    if (!rawKey.startsWith('ak_')) {
      return null;
    }

    const withoutPrefix = rawKey.slice(3);
    const separatorIndex = withoutPrefix.indexOf('_');
    if (separatorIndex <= 0) {
      return null;
    }

    const mode = withoutPrefix.slice(0, separatorIndex);
    if (!this.isApiKeyMode(mode)) {
      return null;
    }

    const encodedPayload = withoutPrefix.slice(separatorIndex + 1);
    if (!ApiKeysService.encodedPayloadPattern.test(encodedPayload)) {
      return null;
    }

    let payload: string;
    try {
      payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    } catch {
      return null;
    }

    const payloadSeparatorIndex = payload.indexOf('.');
    if (payloadSeparatorIndex <= 0) {
      return null;
    }

    const keyId = payload.slice(0, payloadSeparatorIndex);
    const secret = payload.slice(payloadSeparatorIndex + 1);

    if (
      !ApiKeysService.keyIdPattern.test(keyId) ||
      !ApiKeysService.secretPattern.test(secret)
    ) {
      return null;
    }

    return { mode, keyId, secret };
  }

  hashSecret(secret: string): string {
    return createHash('sha256').update(secret, 'utf8').digest('hex');
  }

  verifySecret(secret: string, secretHash: string): boolean {
    const submittedHash = this.hashSecret(secret);
    const submitted = Buffer.from(submittedHash, 'hex');
    const stored = Buffer.from(secretHash, 'hex');

    if (submitted.length !== stored.length) {
      return false;
    }

    return timingSafeEqual(submitted, stored);
  }

  private formatRawKey(keyId: string, secret: string): string {
    return this.formatKeyFromPayload(`${keyId}.${secret}`);
  }

  private formatKeyPreview(keyId: string): string {
    return this.formatKeyFromPayload(`${keyId}.`);
  }

  private formatKeyFromPayload(payload: string): string {
    const encodedPayload = Buffer.from(payload, 'utf8').toString('base64url');
    return `ak_${this.apiKeyConfiguration.mode}_${encodedPayload}`;
  }

  private generateSecret(): string {
    return randomBytes(32).toString('base64url');
  }

  private isApiKeyMode(mode: string): mode is ApiKeyMode {
    return Object.values(ApiKeyMode).includes(mode as ApiKeyMode);
  }
}
