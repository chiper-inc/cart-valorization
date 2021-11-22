import { discountLimitsInputDto, discountLimitsOutputDto } from "../../dto/product";


export const handleDiscountLimits = (
  input: discountLimitsInputDto
): discountLimitsOutputDto => {
  const { quantity, discountedMaximumQuantity, maximumQuantity, price } = input;

  let { managerTotal: originalTotal, discountedTotal: total } = price;

  if (!total) total = originalTotal;

  getProductLimitsForDiscounts(maximumQuantity, discountedMaximumQuantity);

  const maxQuantity =
    maximumQuantity && quantity > maximumQuantity ? maximumQuantity : quantity;

  let quantityWithDiscount = 0;
  let quantityWithOutDiscount = 0;

  if (originalTotal > total) {
    if (discountedMaximumQuantity && maxQuantity > discountedMaximumQuantity) {
      quantityWithDiscount = discountedMaximumQuantity;
    } else {
      quantityWithDiscount = maxQuantity;
    }
  }

  quantityWithOutDiscount = maxQuantity - quantityWithDiscount;

  return {
    quantityWithDiscount,
    quantityWithOutDiscount,
    remainingQuantity: quantity - maxQuantity,
  };
};

const getProductLimitsForDiscounts = (
  maximumQuantity?: number,
  discountedMaximumQuantity?: number
): void => {
  const hasDiscountLimit = !!discountedMaximumQuantity;
  const hasLimit = !!maximumQuantity;
  // limit the number of discounts taking based on the reference order limit
  // maximumQuantity tiene prioridad sobre discountedMaximumQuantity
  if (
    discountedMaximumQuantity &&
    maximumQuantity &&
    hasDiscountLimit &&
    hasLimit &&
    discountedMaximumQuantity > maximumQuantity
  ) {
    discountedMaximumQuantity = maximumQuantity;
  }
};
