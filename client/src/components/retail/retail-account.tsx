import { useQuery } from '@apollo/client';
import { FullRetailAccountDocument } from '../../graphql/__generated__/graphql';
import { RetailProperties } from './retail-properties';

export const RetailAccount = () => {
  const { data, loading } = useQuery(FullRetailAccountDocument);

  const retailAccount = data?.retailAccount;

  if (!retailAccount && !loading) {
    return (
      <div className="content-container">
        <h1>Error Loading Your Accoung!</h1>
        <p>
          We had a problem loading your account. It will likely be back up soon,
          but if not, email us at{' '}
          <a className="link" href="mailto:support@sophisticatedcerberus.com">
            support@sophisticatedcerberus.com
          </a>
        </p>
      </div>
    );
  }

  if ((!retailAccount && loading) || !retailAccount) {
    return (
      <div className="content-container">
        <p>Loading your account</p>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h1>{retailAccount.name} | Retail Account</h1>
      <h2>Your Properties</h2>
      <RetailProperties properties={retailAccount.addresses} />
    </div>
  );
};
