import { ProductPricesInputDto } from '.';

export class ReferenceLevelInputDto {
  quantity?: number;
  prices!: ProductPricesInputDto[];
}
