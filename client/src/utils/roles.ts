import { useOrganizationList, useUser } from '@clerk/clerk-react';

import { Roles } from '../../types/globals'

export const checkRole = (role: Roles) => {
  const { user } = useUser();

  return user?.publicMetadata.role === role;
}

export const checkCompanyAndRole = async (companyName: string, role: Roles) => {
  const { user } = useUser();
 
  const companyMemberships = await user?.getOrganizationMemberships();

  if(companyMemberships?.data) {
    for(let membership of companyMemberships.data) {
      if(membership.organization.name === companyName) {
        return role === membership.role;
      }
    }
  }
  return false;
}

export const isSuperAdmin = () => {
  const organizations = useOrganizationList({userMemberships: {pageSize: 5}});

  const memberships = organizations?.userMemberships?.data ?? [];

  for(let membership of memberships) {
    if(membership.organization.id === process.env.REACT_APP_CLERK_SUPER_ADMIN_COMPANY_ID) {
      return true;
    }
  }
  return false;
}