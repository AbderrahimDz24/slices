import { randomUUID } from 'node:crypto';

export function generateWalletId(): string {
  return `wal_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
}
