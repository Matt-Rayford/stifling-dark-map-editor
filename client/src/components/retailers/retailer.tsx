import { useOrganizationList } from '@clerk/clerk-react';
import { RetailerForm } from './retailer-form';
import { useSdUser } from '../../contexts/user-context';

export const Retailer = () => {
  const user = useSdUser();
  const organizations = useOrganizationList({
    userMemberships: { pageSize: 5 },
  });

  return (
    <div className="content-container">
      {organizations.userMemberships.count === 0 || (true && <RetailerForm />)}
    </div>
  );
};
