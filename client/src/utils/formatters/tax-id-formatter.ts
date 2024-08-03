export const taxIdFormatter = (taxId: string) => {
  if (taxId.length >= 3) {
    return `${taxId.substring(0, 2)}-${taxId.substring(3)}`
    
  } else {
   return taxId
  }
}