import { ProductSort } from '../get-products.query';

export interface GetProductsOptions {
  category?: string;
  sort?: ProductSort;
}
