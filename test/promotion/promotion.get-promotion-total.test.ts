import { getPromotionTotals } from '../../src';
import { CartTotalOuptutDto } from '../../src/dto/cart';
import { PromotionInputDto } from '../../src/dto/promotion';

describe('getPromotionTotals', () => {
  test('it should be correct values', () => {
    const input: PromotionInputDto[] = [];

    const output: CartTotalOuptutDto = {
      subtotal: 0,
      total: 0,
      discount: 0,
      oldTotal: 0,
    };

    expect(getPromotionTotals(input)).toStrictEqual(output);
  });

  test('it should be correct values regular', () => {
    const input: PromotionInputDto[] = [
      {
        discountedManagerPrice: 12003.16,
        priceNoTaxDiscounted: 10086.7,
        managerPrice: 15161.83,
        priceNoTax: 12741.04,
        minQuantity: 1,
        multipleQuantity: undefined,
        quantity: 5,
      },
    ];

    const output: CartTotalOuptutDto = {
      subtotal: 50433.5,
      total: 60015.8,
      discount: 15793.35,
      oldTotal: 75809.15,
    };

    const result = getPromotionTotals(input);

    expect(result).toStrictEqual(output);
  });
});
