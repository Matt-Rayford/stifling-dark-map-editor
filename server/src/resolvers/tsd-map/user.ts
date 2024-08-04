import { DBUser } from '@/types/user/user';

export const User = {
  viewedSetup: (user: DBUser) => user.viewed_setup,
};
