export const zipCodeFormatter = (zipCode: string) => {
  zipCode = zipCode.replace(/[^0-9-]/g, '');

  if (zipCode.length > 10) {
    return zipCode.substring(0, 10);
  } else if (zipCode.length >= 6) {
    if (zipCode[5] !== '-') {
      return `${zipCode.substring(0, 5)}-${zipCode.substring(5)}`;
    }
    return zipCode;
  } else {
    return zipCode;
  }
};
