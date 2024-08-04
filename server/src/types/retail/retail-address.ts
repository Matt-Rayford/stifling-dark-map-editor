import { ContactInput } from '../user/contact';

export interface RetailAddress {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface DBRetailAddress {
  id: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
}

export interface RetailAddressInput {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  contact: ContactInput;
}
