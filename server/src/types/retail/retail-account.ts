export interface RetailAccount {
  id: string;
  name: string;
  taxId: string;
  verified: boolean;
  rejected: boolean;
}

export interface DBRetailAccount {
  id: string;
  name: string;
  tax_id: string;
  verified: boolean;
  rejected: boolean;
}

export interface RetailAccountInput {
  name: string;
  taxId: string;
}
