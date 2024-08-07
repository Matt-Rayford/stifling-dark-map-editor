import { DBSpaceType } from '@/types/tsd-map/space-type';

import { cachedSpaceTypes, initDBCache } from '@/utils/cache';

export const getSpaceTypes = async (): Promise<DBSpaceType[]> => {
  if (!cachedSpaceTypes.size) {
    await initDBCache();
  }
  return Array.from(cachedSpaceTypes.values());
};

export const getSpaceTypeById = async (id: string): Promise<DBSpaceType> => {
  if (!cachedSpaceTypes.size) {
    await getSpaceTypes();
  }

  return cachedSpaceTypes.get(id);
};
