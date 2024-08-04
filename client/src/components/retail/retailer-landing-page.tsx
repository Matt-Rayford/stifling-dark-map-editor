import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { RetailAccountForm } from './retail-account-form';
import {
  RetailAccountDocument,
  RetailAccountQuery,
} from '../../graphql/__generated__/graphql';

export const RetailLandingPage = () => {
  const [retailAccount, setRetailAccount] =
    useState<RetailAccountQuery['retailAccount']>();

  const { loading } = useQuery(RetailAccountDocument, {
    onCompleted: (data) => {
      if (data.retailAccount) {
        setRetailAccount(data.retailAccount);
      }
    },
  });

  return (
    <div className="content-container">
      {loading && <p>Loading account information...</p>}
      {!retailAccount && !loading && (
        <RetailAccountForm
          onRequest={(retailAccount) => setRetailAccount(retailAccount)}
        />
      )}
      {retailAccount && !loading && !retailAccount.verified && (
        <>
          <h1>Your Account is Pending</h1>
          <p>
            Our team is reviewing your information, and your account will be
            approved within 48 hours!
          </p>
        </>
      )}
    </div>
  );
};
