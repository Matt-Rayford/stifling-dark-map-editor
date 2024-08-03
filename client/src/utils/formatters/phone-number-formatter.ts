export const phoneNumberFormatter = (phoneNumber: string) => {
  if (phoneNumber.length >= 8) {
    return `${phoneNumber.substring(0, 7)}-${phoneNumber.substring(8)}`
    
  }
  else if (phoneNumber.length >= 4) {
    console.log("Phone number: ", phoneNumber)
    return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(4)}`
  } 
  else {
   return phoneNumber
  }
}