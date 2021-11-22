import { ProductPricesInputDto } from '.';

export class setPriceInputDto {
  shouldSetPrice?: boolean;
  price!: ProductPricesInputDto;
  actualPrice?: ProductPricesInputDto;
}
