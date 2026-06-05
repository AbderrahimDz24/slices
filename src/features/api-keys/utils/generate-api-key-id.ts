import { randomUUID } from 'node:crypto';

export function generateApiKeyId(): string {
  return `apk_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
}
