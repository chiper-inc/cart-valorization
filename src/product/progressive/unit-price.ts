import { ProductPricesInputDto, UnitPrice } from '../../dto/product';

export const getUnitPrice = (price: ProductPricesInputDto): UnitPrice => {
  const {
    discountedBase,
    managerTotal,
    managerSubtotal,
    discountedSubtotal,
    discountedTotal,
    base,
  } = price;

  const unitPrice = {
    total: managerTotal,
    subtotal: managerSubtotal,
    discountedTotal: 0,
    discountedSubtotal: 0,
    discountedBase: 0,
    base,
    originalbase: base,
    originalSubtotal: managerSubtotal,
    originalTotal: managerTotal,
  };

  if (discountedBase) {
    unitPrice.discountedTotal = unitPrice.total - (discountedTotal || 0);
    unitPrice.discountedSubtotal =
      unitPrice.subtotal - (discountedSubtotal || 0);
    unitPrice.discountedBase = unitPrice.base - discountedBase;
    unitPrice.total = discountedTotal || 0;
    unitPrice.subtotal = discountedSubtotal || 0;
    unitPrice.base = discountedBase;
  }
  return unitPrice;
};
