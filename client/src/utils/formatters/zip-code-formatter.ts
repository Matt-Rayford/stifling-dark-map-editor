export const zipCodeFormatter = (zipCode: string) => {
  if (zipCode.length >= 5) {
    return `${zipCode.substring(0, 5)}-${zipCode.substring(6)}`
    
  } else {
   return zipCode
  }
}