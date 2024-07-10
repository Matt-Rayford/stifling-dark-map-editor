import { useUser } from '@clerk/clerk-react';

import { Roles } from '../../types/globals'

export const checkRole = (role: Roles) => {
  const { user } = useUser();

  return user?.publicMetadata.role === role;
}