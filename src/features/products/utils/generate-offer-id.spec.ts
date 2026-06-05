import { generateOfferId } from '@products/utils';

describe('generateOfferId', () => {
  it('generates an offer ID with the expected prefix and length', () => {
    expect(generateOfferId()).toMatch(/^off_[0-9a-f]{16}$/);
  });

  it('generates unique IDs', () => {
    expect(generateOfferId()).not.toBe(generateOfferId());
  });
});
