import { DBSpaceType } from '@/types/tsd-map/space-type';

export const SpaceType = {
  iconUrl: (spaceType: DBSpaceType) => spaceType.icon_url,
};
