import { pool } from '../..';
import {
  DBRetailAddress,
  RetailAddressInput,
} from '@/types/retail/retail-address';

export const createRetailAddress = (
  retailAccountId: string,
  addressInfo: RetailAddressInput,
  contactId: string
) => {
  const query =
    'INSERT INTO retail_address (retail_account_id, street_address, city, state, postal_code, contact_id, name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

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
        addressInfo.name ?? null,
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
