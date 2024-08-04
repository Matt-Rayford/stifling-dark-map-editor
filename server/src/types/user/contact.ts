export interface Contact {
  id: string;
  emailAddress: string;
  name: string;
  phoneNumber: string;
}

export interface ContactInput {
  emailAddress: string;
  name: string;
  phoneNumber: string;
}

export interface DBContact {
  id: string;
  email_address: string;
  name: string;
  phone_number: string;
}
