import { randomUUID } from 'node:crypto';

export function generateWalletLedgerEntryId(): string {
  return `wle_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
}
