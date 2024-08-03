import { verifyTokenAndGetUser, verifyTokenAndGetUserEmail } from "@/utils/clerk";
import { pool } from "../..";

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