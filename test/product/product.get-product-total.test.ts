import { getProductTotals } from "../../src";
import { CartTotalOuptutDto } from "../../src/dto/cart";
import { ProductInputDto } from "../../src/dto/product";

describe('getProductTotals', () => {
  test('it should be correct values without products', () => {
    const input: ProductInputDto[] = [];

    const output: CartTotalOuptutDto = {
      subtotal: 0,
      total: 0,
      discount: 0,
      oldTotal: 0,
    };

    expect(getProductTotals(input)).toStrictEqual(output);
  });

  test('it should be correct values regular', () => {
    const input: ProductInputDto[] = [
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

    const output: CartTotalOuptutDto = {
      subtotal: 127850,
      total: 131140,
      discount: 8373.25,
      oldTotal: 139513.25,
    };

    expect(getProductTotals(input)).toStrictEqual(output);
  });

  test('it should be correct values progressive', () => {
    const input: ProductInputDto[] = [
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
    ];

    const output: CartTotalOuptutDto = {
      subtotal: 44770.08,
      total: 44770.08,
      discount: 4069.92,
      oldTotal: 48840,
    };

    expect(getProductTotals(input)).toStrictEqual(output);
  });

  test('it should be correct values for multiples products', () => {
    const input: ProductInputDto[] = [
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

    const output: CartTotalOuptutDto = {
      subtotal: 172620.08,
      total: 175910.08,
      discount: 12443.17,
      oldTotal: 188353.25,
    };

    expect(getProductTotals(input)).toStrictEqual(output);
  });

  test('it should be correct values regular without discount', () => {
    const input: ProductInputDto[] = [
      {
        prices: [
          {
            base: 1438,
            measurementUnit: 'Kilogramo',
            managerPrice: 1438,
            managerTotal: 1438,
            managerSubtotal: 1438,
            discountedSubtotal: 27164.9,
            discountedTotal: 27902.65,
            multipleQuantity: 1,
            startQuantity: 1,
            unitPrice: 1438,
          },
        ],
        scaleType: 'default',
        quantity: 15,
        minQuantity: 10,
      },
    ];

    const output: CartTotalOuptutDto = {
      subtotal: 21570,
      total: 21570,
      discount: 0,
      oldTotal: 21570,
    };

    expect(getProductTotals(input)).toStrictEqual(output);
  });

  test('it should be correct values regular with discount top', () => {
    const input: ProductInputDto[] = [
      {
        prices: [
          {
            base: 23890,
            discount: 10,
            measurementUnit: 'Mililitro',
            managerPrice: 23890,
            managerTotal: 28429.1,
            managerSubtotal: 23890,
            discountedBase: 21501,
            discountedSubtotal: 21501,
            discountedTotal: 25586.19,
            unitPrice: 9.476,
            multipleQuantity: 1,
            startQuantity: 1,
          },
        ],
        scaleType: 'default',
        quantity: 25,
        minQuantity: 1,
        discount: 10,
        discountedMaximumQuantity: 5,
      },
    ];

    const output: CartTotalOuptutDto = {
      total: 696512.95,
      subtotal: 585305,
      discount: 14214.55,
      oldTotal: 710727.5,
    };

    expect(getProductTotals(input)).toStrictEqual(output);
  });
});
