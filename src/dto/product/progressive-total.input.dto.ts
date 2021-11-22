import { ProductPricesInputDto } from '.';

export class ProgressiveTotalInputDto {
  prices!: ProductPricesInputDto[];
  quantity!: number;
}
