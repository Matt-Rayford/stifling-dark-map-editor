import { ContactInput, DBContact } from '@/types/user/contact';

export const Contact = {
  emailAddress: (contact: DBContact) => contact.email_address,
  phoneNumber: (retailAddress: DBContact) => retailAddress.phone_number,
};
