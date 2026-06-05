import { ApiProperty } from '@nestjs/swagger';
import { Product, ProductType } from '@products/models';

export class ProductSummaryDto {
  @ApiProperty({ example: 'prd_0000000000000001' })
  id: string;

  @ApiProperty({ example: 'mobilis' })
  code: string;

  @ApiProperty({ example: 'Mobilis' })
  name: string;

  @ApiProperty({ enum: ProductType, example: ProductType.MobileTopup })
  type: ProductType;

  static fromEntity(product: Product): ProductSummaryDto {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      type: product.type,
    };
  }
}
