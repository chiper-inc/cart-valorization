import { CartTotalOuptutDto } from '../dto/cart';
import { ProductInputDto, ProductTotalsOutputDto } from '../dto/product';
import { round } from '../utils/funcionts';
import { calculateNotProgressiveTotals } from './not-progressive';
import { calculateProgressiveTotal } from './progressive';

export const productTotal = (
  product: ProductInputDto
): ProductTotalsOutputDto => {
  const { scaleType, quantity, prices } = product;

  if (scaleType === 'progressive') {
    return calculateProgressiveTotal({
      prices,
      quantity,
    });
  }

  return calculateNotProgressiveTotals(product);
};

export const getProductTotals = (
  products: ProductInputDto[]
): CartTotalOuptutDto => {
  let total = 0;
  let subtotal = 0;
  let oldTotal = 0;
  let discount = 0;

  for (const product of products) {
    const { itemTotal, itemSubtotal, itemDiscounted } = productTotal(product);

    total += itemTotal;
    subtotal += itemSubtotal;
    discount += itemDiscounted;
    oldTotal += itemTotal + itemDiscounted;
  }

  return {
    total: round(total),
    subtotal: round(subtotal),
    discount: round(discount),
    oldTotal: round(oldTotal),
  };
};
