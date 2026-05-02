import { randomUUID } from 'node:crypto';

export function generateUserId(): string {
  return `usr_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
}
