import { ProductInputDto } from '../product';
import { PromotionInputDto } from '../promotion';

export class CartTotalInputDto {
  products!: ProductInputDto[];

  promotions!: PromotionInputDto[];
}
