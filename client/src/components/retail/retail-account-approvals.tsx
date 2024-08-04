import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

import {
  Approval,
  RetailAccountsToVerifyDocument,
  RetailAccountsToVerifyQuery,
  UpdateRetailAccountApprovalDocument,
} from '../../graphql/__generated__/graphql';

export const RetailAccountApprovals = () => {
  const [retailAccounts, setRetailAccounts] =
    useState<RetailAccountsToVerifyQuery['retailAccounts']>();
  const { loading } = useQuery(RetailAccountsToVerifyDocument, {
    onCompleted: (data) => {
      if (data.retailAccounts) {
        setRetailAccounts(data.retailAccounts);
      }
    },
  });

  const [updateRetailAccountApproval] = useMutation(
    UpdateRetailAccountApprovalDocument
  );

  if (loading) {
    return <p>Loading retail accounts to verify...</p>;
  }

  if (retailAccounts?.length === 0) {
    return <p>All caught up! There are no active requests</p>;
  }

  const removeRetailAccount = (id: string) => {
    setRetailAccounts(retailAccounts?.filter((r) => r.id !== id));
  };

  const approveRetailAccount = (id: string) => {
    updateRetailAccountApproval({
      variables: { id, approval: Approval.Approved },
    }).then(() => removeRetailAccount(id));
  };
  const rejectRetailAccount = (id: string) => {
    updateRetailAccountApproval({
      variables: { id, approval: Approval.Rejected },
    }).then(() => removeRetailAccount(id));
  };

  return retailAccounts?.map((retailAccount) => {
    const address = retailAccount.addresses[0];

    return (
      <div key={retailAccount.id}>
        <div className="flex-fluid gap-2 row-gap-0">
          <p>
            <b>Name:</b> {retailAccount.name}
          </p>
          <p>
            <b>Tax ID:</b> {retailAccount.taxId}
          </p>
          <p>
            <b>Address:</b> {address.streetAddress} - {address.city},{' '}
            {address.state} {address.postalCode}
          </p>
          <p>
            <b>Contact:</b> {address.contact.name} |{' '}
            {address.contact.phoneNumber} | {address.contact.emailAddress}
          </p>
        </div>
        <div className="flex-fluid gap-1 row-gap-0">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => approveRetailAccount(retailAccount.id)}
          >
            Approve
          </button>
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => rejectRetailAccount(retailAccount.id)}
          >
            Reject
          </button>
        </div>
        <hr />
      </div>
    );
  });
};
