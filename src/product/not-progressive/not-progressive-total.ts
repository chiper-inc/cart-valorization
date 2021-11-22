import { ProductInputDto, ProductTotalsOutputDto } from '../../dto/product';
import { handleDiscountLimits } from './handle-discount-limits';
import { getReferenceLevelPrice } from './reference-level-price';

export const calculateNotProgressiveTotals = (
  product: ProductInputDto
): ProductTotalsOutputDto => {
  const {
    prices,
    quantity,
    maximumQuantity,
    discountedMaximumQuantity,
  } = product;

  const actualLevelPrices = getReferenceLevelPrice({ prices, quantity });
  const firstLevelPrices = getReferenceLevelPrice({ quantity: 0, prices });

  const {
    quantityWithDiscount,
    quantityWithOutDiscount,
  } = handleDiscountLimits({
    maximumQuantity,
    price: actualLevelPrices,
    quantity,
    discountedMaximumQuantity,
  });

  const discountedPrice = actualLevelPrices.discountedTotal || 0;
  const originalPrice = actualLevelPrices.managerTotal || 0;
  const isDiscount = !!quantityWithDiscount;
  const hasLevels =
    !!quantityWithOutDiscount &&
    firstLevelPrices.managerTotal !== actualLevelPrices.managerTotal;
  const totalWithDiscount = quantityWithDiscount * discountedPrice;
  const totalWithOutDiscount = quantityWithOutDiscount * originalPrice;
  const subtotalWithDiscount =
    quantityWithDiscount * (actualLevelPrices.discountedSubtotal || 0);
  const subtotalWithOutDiscount =
    quantityWithOutDiscount * (actualLevelPrices.managerSubtotal || 0);

  const response = {
    itemTotal: totalWithDiscount + totalWithOutDiscount,
    itemSubtotal: subtotalWithDiscount + subtotalWithOutDiscount,
    itemDiscounted: isDiscount
      ? (firstLevelPrices.managerTotal - discountedPrice) * quantityWithDiscount
      : 0,
    itemLevelDiscounted: hasLevels
      ? (firstLevelPrices.managerTotal - originalPrice) *
        quantityWithOutDiscount
      : 0,
    itemLevels: hasLevels ? quantityWithOutDiscount || 0 : 0,
    itemDiscounts: isDiscount ? quantityWithDiscount || 0 : 0,
  };

  return response;
};
