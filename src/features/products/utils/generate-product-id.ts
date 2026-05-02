import { randomUUID } from 'node:crypto';

export function generateProductId(): string {
  return `prd_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
}
