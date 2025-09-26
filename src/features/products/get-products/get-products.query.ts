export type ProductSort = 'price_asc' | 'price_desc';

export class GetProductsQuery {
  public readonly sort?: ProductSort;

  constructor(
    public readonly category?: string,
    sort?: string,
  ) {
    this.sort =
      sort === 'price_asc' || sort === 'price_desc'
        ? (sort as ProductSort)
        : undefined;
  }
}
