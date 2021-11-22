export class ProductPricesInputDto {
  managerPrice!: number;
  managerTotal!: number;
  managerSubtotal!: number;
  base!: number;
  discountedBase?: number;
  discountedSubtotal?: number;
  discountedTotal?: number;
  startQuantity!: number;
  unitPrice!: number;
  measurementUnit?: string;
  endQuantity?: number;
  multipleQuantity?: number;
  discount?: number;
  actualStartQuantity?: number;
}
