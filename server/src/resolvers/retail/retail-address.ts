import { getContactById } from '@/db/user/contact';
import { DBRetailAddress } from '@/types/retail/retail-address';

export const RetailAddress = {
  contact: async (retailAddress: DBRetailAddress) =>
    getContactById(retailAddress.contact_id),
  postalCode: (retailAddress: DBRetailAddress) => retailAddress.postal_code,
  streetAddress: (retailAddress: DBRetailAddress) =>
    retailAddress.street_address,
};
