import { verifyTokenAndGetUser, verifyTokenAndGetUserEmail } from "@/utils/clerk";
import { pool } from "../..";

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

export const Retailer = {
  retailersToVerify: async (root, _, context) => {
    const user = await verifyTokenAndGetUser(context.token);
    console.log("USER: ", user)
    if(user) {
      return [];
    }
    return [];
  },
  retailerAddresses: async (root, {retailerId}: {retailerId: string}, context) => { 
    const user = await verifyTokenAndGetUser(context.token);
    if (user) {
			return []
		}
		return null;
  }
}