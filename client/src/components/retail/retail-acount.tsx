import { useQuery } from '@apollo/client';
import { FullRetailAccountDocument } from '../../graphql/__generated__/graphql';

export const RetailAccount = () => {
  const { data, loading } = useQuery(FullRetailAccountDocument);

  const retailAccount = data?.retailAccount;

  console.log('Retail account: ', retailAccount);

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

  return (
    <div className="content-container">
      <h1>retailAccount.com</h1>
    </div>
  );
};
