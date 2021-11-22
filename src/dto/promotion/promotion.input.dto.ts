export class PromotionInputDto {
  discountedManagerPrice!: number;
  priceNoTaxDiscounted!: number;
  managerPrice!: number;
  priceNoTax!: number;
  minQuantity?: number;
  multipleQuantity?: number;
  quantity!: number;
}
