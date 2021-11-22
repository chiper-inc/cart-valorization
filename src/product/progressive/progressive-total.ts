import {
  ProductTotalsOutputDto,
  ProgressiveTotalInputDto,
} from '../../dto/product';
import { getUnitPrice } from './unit-price';

export const calculateProgressiveTotal = (
  input: ProgressiveTotalInputDto
): ProductTotalsOutputDto => {
  const { prices, quantity } = input;

  let operations = prices.length; // conocer cuantas operaciones se debe realizar (saber en que escala estamos)

  let qtyOrdered = quantity; // cantidades usadas
  let tempQuantity = 0;

  let itemTotal = 0;
  let itemSubtotal = 0;
  let itemDiscounted = 0;
  let itemDiscounts = 0;

  for (const price of prices) {
    const { endQuantity } = price;
    const isLastOperation = operations === 1;
    const unitPrice = getUnitPrice(price);

    let currentQuantity = qtyOrdered;

    if (!isLastOperation && endQuantity) {
      currentQuantity = endQuantity - tempQuantity;

      if (currentQuantity > qtyOrdered) {
        currentQuantity = qtyOrdered;
      }
    }

    currentQuantity =
      currentQuantity > qtyOrdered || isLastOperation
        ? qtyOrdered
        : currentQuantity;

    itemTotal += currentQuantity * unitPrice.total;
    itemSubtotal += currentQuantity * unitPrice.subtotal;

    itemDiscounted += currentQuantity * unitPrice.discountedTotal;
    itemDiscounts += currentQuantity * unitPrice.discountedSubtotal;

    tempQuantity = endQuantity || 0;
    qtyOrdered -= currentQuantity;
    operations -= 1;
  }

  return {
    itemTotal,
    itemSubtotal,
    itemDiscounted,
    itemDiscounts,
    itemLevelDiscounted: 0,
    itemLevels: 0,
  };
};
