import { CartTotalInputDto, CartTotalOuptutDto } from '../dto/cart';
import { getProductTotals } from '../product';
import { getPromotionTotals } from '../promotion';
import { round } from '../utils/funcionts';

export const cartTotal = (input: CartTotalInputDto): CartTotalOuptutDto => {
  const { products, promotions } = input;

  let total = 0;
  let subtotal = 0;
  let oldTotal = 0;
  let discount = 0;

  const productTotals = getProductTotals(products);
  const promoTotals = getPromotionTotals(promotions);

  total = productTotals.total + promoTotals.total;
  subtotal = productTotals.subtotal + promoTotals.subtotal;
  discount = productTotals.discount + promoTotals.discount;
  oldTotal = productTotals.oldTotal + promoTotals.oldTotal;

  return {
    total: round(total),
    subtotal: round(subtotal),
    oldTotal: round(oldTotal),
    discount: round(discount),
  };
};
