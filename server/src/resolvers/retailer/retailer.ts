import { verifyTokenAndGetUser, verifyTokenAndGetUserEmail } from "@/utils/clerk";
import { pool } from "../..";
import { DBRetailer } from "@/types/retailer/retailer";

export const getRetailerAddresses = (retailerId: string) => {
  const query =
    'SELECT * FROM retailer_address WHERE retailer_id=$1';

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
    console.error(`ERROR - getRetailerAddresses(${retailerId}): `, e);
    throw new Error('Error getting retailer addresses');
  });
}

export const getRetailersToVerify = () => {
  const query = 
    'SELECT * FROM retailer WHERE verified = false AND rejected = false'

  return pool.query({
    text: query
  }).then((r) => {
    const data = r.rows;
    return data;
  }) .catch((e) => {
    console.error(`ERROR - getRetailersToVerify(): `, e);
    throw new Error('Error getting retailers to verify');
  });
}

export const createRetailAccount = async (
	name: string,
	taxId: string,
	userId: string
) => {
	const query =
		'INSERT INTO retailer (name, tax_id, created_by_id) VALUES ($1, $2, $3) RETURNING *';

	return pool
		.query({
			text: query,
			values: [name, taxId, userId],
		})
		.then((r) => {
			return r.rows?.[0] as DBRetailer;
		})
		.catch((e) => {
			console.error(`ERROR - createRetailAccount(${name}): `, e);
			throw new Error('Error creating retail account group');
		});
};


export const Retailer = {
  addresses: async (retailer, _, context) => { 
    const user = await verifyTokenAndGetUser(context.token);
    if (user) {
			return []
		}
		return null;
  }
}