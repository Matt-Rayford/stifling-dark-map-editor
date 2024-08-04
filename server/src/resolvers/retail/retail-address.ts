import { verifyTokenAndGetUser } from '@/utils/clerk';
import { pool } from '../..';
import {
  DBRetailAddress,
  RetailAddressInput,
} from '@/types/retail/retail-address';

export const getRetailAddresssContact = (id: string) => {
  const query = 'SELECT * FROM contact WHERE id = $1';

  return pool
    .query({
      text: query,
      values: [id],
    })
    .then((r) => {
      const data = r.rows?.[0];
      return data;
    })
    .catch((e) => {
      console.error(`ERROR - getRetailAddresssContact(${id}): `, e);
      throw new Error('Error getting retail address contact');
    });
};

export const createRetailAddress = (
  retailAccountId: string,
  addressInfo: RetailAddressInput,
  contactId: string
) => {
  const query =
    'INSERT INTO retail_address (retail_account_id, street_address, city, state, postal_code, contact_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

  console.log('CREATE RETAIL ADDRESS', addressInfo);
  return pool
    .query({
      text: query,
      values: [
        retailAccountId,
        addressInfo.streetAddress,
        addressInfo.city,
        addressInfo.state,
        addressInfo.postalCode,
        contactId,
      ],
    })
    .then((r) => {
      return r.rows?.[0] as DBRetailAddress;
    })
    .catch((e) => {
      console.error(`ERROR - createRetailAddress(${retailAccountId}): `, e);
      throw new Error('Error creating retail address');
    });
};

export const getRetailAddressesByRetailAccountId = (
  retailAccountId: string
) => {
  const query = 'SELECT * FROM retail_address WHERE retail_account_id = $1';

  return pool
    .query({
      text: query,
      values: [retailAccountId],
    })
    .then((r) => {
      return r.rows as DBRetailAddress[];
    })
    .catch((e) => {
      console.error(
        `ERROR - getRetailAddressesByRetailAccountId(${retailAccountId}): `,
        e
      );
      throw new Error('Error retrieving retail account addresses');
    });
};

export const RetailAddress = {
  contact: async (retailAddress, _, context) => {
    const user = await verifyTokenAndGetUser(context.token);
    if (user) {
      return getRetailAddresssContact(retailAddress.contact);
    }
    return null;
  },
};
