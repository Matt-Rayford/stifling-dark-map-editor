import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { RetailAccountForm } from './retail-account-form';
import {
  RetailAccountDocument,
  RetailAccountQuery,
} from '../../graphql/__generated__/graphql';
import { RetailAccountStatus } from './retail-account-status';

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
        <RetailAccountStatus retailAccount={retailAccount} />
      )}
    </div>
  );
};
