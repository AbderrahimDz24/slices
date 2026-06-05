import { randomBytes } from 'node:crypto';

export function generateOfferId(): string {
  return `off_${randomBytes(8).toString('hex')}`;
}
