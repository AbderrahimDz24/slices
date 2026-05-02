import { generateProductId } from '@products/utils';

describe('generateProductId', () => {
  it('returns a prefixed 16-hex identifier', () => {
    expect(generateProductId()).toMatch(/^prd_[0-9a-f]{16}$/);
  });

  it('returns different identifiers across calls', () => {
    expect(generateProductId()).not.toBe(generateProductId());
  });
});
