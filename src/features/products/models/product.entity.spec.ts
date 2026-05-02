import { Product } from '@products/models';

describe('Product.assignId', () => {
  it('assigns a generated ID when one is missing', () => {
    const product = new Product();

    product.assignId();

    expect(product.id).toMatch(/^prd_[0-9a-f]{16}$/);
  });

  it('preserves an explicit ID', () => {
    const product = new Product();

    product.id = 'prd_1234567890abcdef';
    product.assignId();

    expect(product.id).toBe('prd_1234567890abcdef');
  });
});
