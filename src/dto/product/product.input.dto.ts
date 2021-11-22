import { ProductPricesInputDto } from './produtc-prices.input.dto';

export class ProductInputDto {
  multipleQuantity?: number;

  merchantId?: number;

  discountedMaximumQuantity?: number;

  maximumQuantity?: number;

  onOffEndDate?: Date;

  exhausted?: boolean;

  scaleType?: string;

  quantity!: number;

  prices!: ProductPricesInputDto[];

  minQuantity?: number;

  unitPrice?: number;

  discount?: number;
}
