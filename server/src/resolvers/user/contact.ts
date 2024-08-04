import { pool } from '@/index';
import { ContactInput, DBContact } from '@/types/user/contact';

export const createContact = (contact: ContactInput) => {
  const query =
    'INSERT INTO contact (name, phone_number, email_address) VALUES ($1, $2, $3) RETURNING *';

  return pool
    .query({
      text: query,
      values: [contact.name, contact.phoneNumber, contact.email],
    })
    .then((r) => {
      return r.rows?.[0] as DBContact;
    })
    .catch((e) => {
      console.error(`ERROR - createContact(${contact.name}): `, e);
      throw new Error('Error creating contact');
    });
};
