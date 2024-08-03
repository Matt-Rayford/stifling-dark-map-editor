import { verifyTokenAndGetUser, verifyTokenAndGetUserEmail } from "@/utils/clerk";
import { pool } from "../..";
import { DBRetailerAddress, RetailerAddressInput } from "@/types/retailer/retailer-address";

export const getRetailerAddresssContact = (id: string) => {
  const query = 
    'SELECT * FROM contact WHERE id = $1'

  return pool.query({
    text: query,
    values: [id]
  }).then((r) => {
    const data = r.rows?.[0];
    return data;
  }) .catch((e) => {
    console.error(`ERROR - getRetailerAddresssContact(${id}): `, e);
    throw new Error('Error getting retailer address contact');
  });
}

export const createRetailerAddress = (retailerId: string, addressInfo: RetailerAddressInput, contactId: string) => {
  const query = 'INSERT INTO retailer_address (retailer_id, street_address, city, state, postal_code, contact_id) VALUES $1, $2, $3, $4, $5, $6';

   return pool
		.query({
			text: query,
			values: [retailerId, addressInfo.streetAddress, addressInfo.city, addressInfo.state, addressInfo.postalCode, contactId],
		})
		.then((r) => {
			return r.rows?.[0] as DBRetailerAddress;
		})
		.catch((e) => {
			console.error(`ERROR - createRetailerAddress(${retailerId}): `, e);
			throw new Error('Error creating retailer address');
		});
}

export const Retailer = {
  contact: async (retailerAddress, _, context) => { 
    console.log("Retailer Address: ", retailerAddress)
    const user = await verifyTokenAndGetUser(context.token);
    if (user) {
      return getRetailerAddresssContact(retailerAddress.contact);
		}
		return null;
  }
}