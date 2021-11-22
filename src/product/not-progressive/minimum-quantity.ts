import { ProductPricesInputDto } from '../../dto/product';

export const getMinimumQuantity = (prices: ProductPricesInputDto[]): number => {
  let minQuantity = -1;

  for (const price of prices) {
    const { startQuantity } = price;
    if (minQuantity === -1 || minQuantity > startQuantity)
      minQuantity = startQuantity;
  }

  return minQuantity;
};
