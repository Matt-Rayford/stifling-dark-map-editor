export interface Retailer {
	id: string;
	name: string;
	taxId: string;
	verified: boolean;
  rejected: boolean;
}

export interface DBRetailer {
	id: string;
	name: string;
	tax_id: string;
	verified: boolean;
  rejected: boolean;
}

export interface RetailerInput {
	name: string;
	taxId: string;
}