import { CartTotalOuptutDto } from "../dto/cart";
import { PromotionInputDto } from "../dto/promotion";
import { round } from "../utils/funcionts";

const promotionTotal = (promotion: PromotionInputDto) => {
  const {
    quantity,
    discountedManagerPrice,
    managerPrice,
    priceNoTaxDiscounted,
  } = promotion;

  return {
    itemTotal: round(quantity * discountedManagerPrice),
    itemSubtotal: round(quantity * priceNoTaxDiscounted),
    itemDiscounted: round((managerPrice - discountedManagerPrice) * quantity),
    itemOldTotal: round(quantity * managerPrice),
  };
};

export const getPromotionTotals = (
  promotion: PromotionInputDto[]
): CartTotalOuptutDto => {
  let total = 0;
  let subtotal = 0;
  let discount = 0;
  let oldTotal = 0;

  for (const promo of promotion) {
    const {
      itemSubtotal,
      itemTotal,
      itemDiscounted,
      itemOldTotal,
    } = promotionTotal(promo);

    total += itemTotal;
    subtotal += itemSubtotal;
    discount += itemDiscounted;
    oldTotal += itemOldTotal;
  }

  return {
    total: round(total),
    subtotal: round(subtotal),
    discount: round(discount),
    oldTotal: round(oldTotal),
  };
};
