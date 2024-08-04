import { ContactInput } from '../user/contact';

export interface RetailAddress {
  id: string;
  city: string;
  name?: string | null;
  state: string;
  streetAddress: string;
  postalCode: string;
}

export interface DBRetailAddress {
  id: string;
  city: string;
  name?: string | null;
  state: string;
  street_address: string;
  postal_code: string;
}

export interface RetailAddressInput {
  city: string;
  contact: ContactInput;
  name?: string | null;
  state: string;
  streetAddress: string;
  postalCode: string;
}
