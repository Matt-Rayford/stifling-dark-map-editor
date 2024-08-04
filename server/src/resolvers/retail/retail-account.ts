import { getRetailPropertiesByRetailAccountId } from '@/db/retail/retail-property';

export const RetailAccount = {
  addresses: (retailAccount) =>
    getRetailPropertiesByRetailAccountId(retailAccount.id),
  taxId: (retailAccount) => retailAccount.tax_id,
};
