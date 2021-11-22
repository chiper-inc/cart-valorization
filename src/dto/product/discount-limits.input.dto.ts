import { ProductPricesInputDto } from '.';

export class discountLimitsInputDto {
  price!: ProductPricesInputDto;
  quantity!: number;
  maximumQuantity?: number;
  discountedMaximumQuantity?: number;
}
