import {
  ProductPricesInputDto,
  ReferenceLevelInputDto,
} from '../../dto/product';
import { checkLevelQuantity } from './check-level-quantity';
import { getMinimumQuantity } from './minimum-quantity';
import { setPrice } from './set-price';

export const getReferenceLevelPrice = (
  input: ReferenceLevelInputDto
): ProductPricesInputDto => {
  const { prices, quantity } = input;

  let realQuantity = quantity ? quantity : getMinimumQuantity(prices);

  let actualPrice: ProductPricesInputDto = {
    managerPrice: 0,
    managerTotal: 0,
    managerSubtotal: 0,
    base: 0,
    startQuantity: 0,
    unitPrice: 0,
  };

  for (const price of prices) {
    const { startQuantity } = price;

    const actualStartQuantity = actualPrice
      ? actualPrice.actualStartQuantity || 0
      : 0;

    const shouldSetPrice = checkLevelQuantity(
      realQuantity,
      startQuantity,
      actualStartQuantity
    );
    actualPrice = setPrice({ price, shouldSetPrice, actualPrice });
  }

  if (!actualPrice && prices.length > 0) {
    const minQuantity = getMinimumQuantity(prices);
    actualPrice = getReferenceLevelPrice({ prices, quantity: minQuantity });
  }

  return actualPrice;
};
