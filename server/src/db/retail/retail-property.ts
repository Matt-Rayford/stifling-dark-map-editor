import { pool } from '../..';
import {
  DBRetailProperty,
  RetailPropertyInput,
} from '@/types/retail/retail-property';

export const createRetailProperty = (
  retailAccountId: string,
  addressInfo: RetailPropertyInput,
  contactId: string
) => {
  const query =
    'INSERT INTO retail_property (retail_account_id, street_address, city, state, postal_code, contact_id, name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

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
      return r.rows?.[0] as DBRetailProperty;
    })
    .catch((e) => {
      console.error(`ERROR - createRetailProperty(${retailAccountId}): `, e);
      throw new Error('Error creating retail property');
    });
};

export const getRetailPropertiesByRetailAccountId = (
  retailAccountId: string
) => {
  const query = 'SELECT * FROM retail_property WHERE retail_account_id = $1';

  return pool
    .query({
      text: query,
      values: [retailAccountId],
    })
    .then((r) => {
      return r.rows as DBRetailProperty[];
    })
    .catch((e) => {
      console.error(
        `ERROR - getRetailPropertiesByRetailAccountId(${retailAccountId}): `,
        e
      );
      throw new Error('Error retrieving retail account properties');
    });
};
