import { Offer } from '@products/models';

describe('Offer.assignId', () => {
  it('assigns a generated ID when one is missing', () => {
    const offer = new Offer();

    offer.assignId();

    expect(offer.id).toMatch(/^off_[0-9a-f]{16}$/);
  });

  it('preserves an explicit ID', () => {
    const offer = new Offer();

    offer.id = 'off_1234567890abcdef';
    offer.assignId();

    expect(offer.id).toBe('off_1234567890abcdef');
  });
});
