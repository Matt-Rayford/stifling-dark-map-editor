import { ContactInput } from '../user/contact';

export interface RetailProperty {
  id: string;
  city: string;
  name?: string | null;
  state: string;
  streetAddress: string;
  postalCode: string;
}

export interface DBRetailProperty {
  id: string;
  city: string;
  contact_id: string;
  name?: string | null;
  state: string;
  street_address: string;
  postal_code: string;
}

export interface RetailPropertyInput {
  city: string;
  contact: ContactInput;
  name?: string | null;
  state: string;
  streetAddress: string;
  postalCode: string;
}
