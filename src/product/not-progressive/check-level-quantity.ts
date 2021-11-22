export const checkLevelQuantity = (
  quantity: number,
  startQuantity: number,
  actualStartQuantity: number
): boolean => {
  if (quantity < startQuantity) {
    return false;
  }
  return !actualStartQuantity || actualStartQuantity < startQuantity;
};
