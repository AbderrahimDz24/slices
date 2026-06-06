import { randomUUID } from 'node:crypto';

export function generateProviderDispatchOutboxId(): string {
  return `pdo_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
}
