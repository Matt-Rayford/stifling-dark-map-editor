import { ContactInput } from "../user/contact";

export interface RetailerAddress {
  id: string;
	streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface DBRetailerAddress {
  id: string;
	street_address: string;
  city: string;
  state: string;
  postal_code: string;
}

export interface RetailerAddressInput {
	streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  contact: ContactInput;
}