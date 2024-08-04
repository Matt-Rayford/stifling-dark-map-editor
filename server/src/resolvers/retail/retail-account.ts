import { getRetailAddressesByRetailAccountId } from '@/db/retail/retail-address';

export const RetailAccount = {
  addresses: (retailAccount) =>
    getRetailAddressesByRetailAccountId(retailAccount.id),
  taxId: (retailAccount) => retailAccount.tax_id,
};
