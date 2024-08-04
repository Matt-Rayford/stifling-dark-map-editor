export const phoneNumberFormatter = (phoneNumber: string) => {
  phoneNumber = phoneNumber.replace(/[^0-9-]/g, '');

  if (phoneNumber.length > 12) {
    return phoneNumber.substring(0, 12);
  } else if (phoneNumber.length >= 8) {
    if (phoneNumber[7] !== '-') {
      return `${phoneNumber.substring(0, 7)}-${phoneNumber.substring(7)}`;
    }
    return phoneNumber;
  } else if (phoneNumber.length >= 4) {
    if (phoneNumber[3] !== '-') {
      return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3)}`;
    }
    return phoneNumber;
  } else {
    return phoneNumber;
  }
};
