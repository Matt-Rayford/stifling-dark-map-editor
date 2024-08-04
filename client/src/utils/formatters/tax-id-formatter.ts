export const taxIdFormatter = (taxId: string) => {
  taxId = taxId.replace(/[^0-9-]/g, '');

  if (taxId.length > 10) {
    return taxId.substring(0, 10);
  } else if (taxId.length >= 3) {
    if (taxId[2] !== '-') {
      return `${taxId.substring(0, 2)}-${taxId.substring(2)}`;
    }
    return taxId;
  } else {
    return taxId;
  }
};
