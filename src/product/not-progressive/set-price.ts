import { ProductPricesInputDto, setPriceInputDto } from "../../dto/product";

export const setPrice = (input: setPriceInputDto): ProductPricesInputDto => {
  const { price, shouldSetPrice, actualPrice } = input;

  if (shouldSetPrice) {
    const { startQuantity: actualStartQuantity } = price;

    const actualPrice = {
      ...price,
      actualStartQuantity,
    };

    return actualPrice;
  }

  return actualPrice
    ? actualPrice.managerTotal > 0
      ? actualPrice
      : price
    : price;
};
