import { pool } from '../..';
import {
  DBRetailAccount,
  RetailAccount as RetailAccountType,
} from '@/types/retail/retail-account';

export const getRetailAccountAddressesById = (retailerId: string) => {
  const query = 'SELECT * FROM retail_address WHERE retail_account_id=$1';

  return pool
    .query({
      text: query,
      values: [retailerId],
    })
    .then((r) => {
      const data = r.rows;
      return data;
    })
    .catch((e) => {
      console.error(
        `ERROR - getRetailAccountAddressesById(${retailerId}): `,
        e
      );
      throw new Error('Error getting retail acount addresses');
    });
};

export const getRetailAccountsToVerify = () => {
  const query =
    'SELECT * FROM retail_account WHERE verified = false AND rejected = false';

  return pool
    .query({
      text: query,
    })
    .then((r) => {
      const data = r.rows as RetailAccountType[];
      return data;
    })
    .catch((e) => {
      console.error(`ERROR - getRetailAccountsToVerify(): `, e);
      throw new Error('Error getting retail accounts to verify');
    });
};

export const getRetailAccountByUserId = (userId: string) => {
  const query = 'SELECT * FROM retail_account WHERE created_by_id = $1';

  return pool
    .query({
      text: query,
      values: [userId],
    })
    .then((r) => {
      return r.rows?.[0] as DBRetailAccount;
    })
    .catch((e) => {
      console.error(`ERROR - getRetailAccountByUserId(${userId}): `, e);
      throw new Error('Error getting retail account');
    });
};

export const createRetailAccount = async (
  name: string,
  taxId: string,
  userId: string
) => {
  const query =
    'INSERT INTO retail_account (name, tax_id, created_by_id) VALUES ($1, $2, $3) RETURNING *';

  return pool
    .query({
      text: query,
      values: [name, taxId, userId],
    })
    .then((r) => {
      return r.rows?.[0] as DBRetailAccount;
    })
    .catch((e) => {
      console.error(`ERROR - createRetailAccount(${name}): `, e);
      throw new Error('Error creating retail account group');
    });
};
