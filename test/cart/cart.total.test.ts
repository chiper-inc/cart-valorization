import { cartTotal } from '../../src';
import { CartTotalInputDto, CartTotalOuptutDto } from '../../src/dto/cart';
import { ProductInputDto } from '../../src/dto/product';
import { PromotionInputDto } from '../../src/dto/promotion';

describe('cartTotal', () => {
  test('it should be correct values', () => {
    const products: ProductInputDto[] = [];
    const promotions: PromotionInputDto[] = [];
    const input: CartTotalInputDto = {
      products,
      promotions,
    };

    const output: CartTotalOuptutDto = {
      subtotal: 0,
      total: 0,
      discount: 0,
      oldTotal: 0,
    };

    expect(cartTotal(input)).toStrictEqual(output);
  });

  test('it should be correct values regular', () => {
    const promotions: PromotionInputDto[] = [
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

    const products: ProductInputDto[] = [
      {
        prices: [
          {
            base: 4070,
            discount: 8,
            measurementUnit: 'Gramo',
            managerPrice: 4070,
            managerTotal: 4070,
            managerSubtotal: 4070,
            discountedBase: 3730.84,
            discountedSubtotal: 3730.84,
            discountedTotal: 3730.84,
            unitPrice: 4.07,
            multipleQuantity: 1,
            startQuantity: 12,
          },
        ],
        scaleType: 'progressive',
        quantity: 12,
        minQuantity: 1,
      },
      {
        prices: [
          {
            base: 14754.9,
            discount: 6,
            measurementUnit: 'Mililitro',
            managerPrice: 14754.9,
            managerTotal: 27902.65,
            managerSubtotal: 27164.9,
            discountedBase: 13160,
            discountedSubtotal: 25570,
            discountedTotal: 26228,
            unitPrice: 37.204,
            multipleQuantity: 1,
            startQuantity: 1,
          },
        ],
        scaleType: 'default',
        quantity: 5,
      },
    ];

    const input: CartTotalInputDto = {
      products,
      promotions,
    };

    const output: CartTotalOuptutDto = {
      subtotal: 223053.58,
      total: 235925.88,
      discount: 28236.52,
      oldTotal: 264162.4,
    };

    expect(cartTotal(input)).toStrictEqual(output);
  });
});
