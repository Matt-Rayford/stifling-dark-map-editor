import { getContactById } from '@/db/user/contact';
import { DBRetailProperty } from '@/types/retail/retail-property';

export const RetailProperty = {
  contact: async (retailAddress: DBRetailProperty) =>
    getContactById(retailAddress.contact_id),
  postalCode: (retailAddress: DBRetailProperty) => retailAddress.postal_code,
  streetAddress: (retailAddress: DBRetailProperty) =>
    retailAddress.street_address,
};
