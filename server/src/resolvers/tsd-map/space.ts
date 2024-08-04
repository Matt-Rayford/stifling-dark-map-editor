import { getLightLevelById } from '@/db/tsd-map/light-level';
import { getSpaceTypeById } from '@/db/tsd-map/space-type';

import { DBSpace } from '@/types/tsd-map/space';

import { cachedSpaceGroups, initSpaceGroupsCache } from '@/utils/cache';

export const Space = {
  col: (space: DBSpace) => space.col_num,
  group: async (space: DBSpace) => {
    if (!cachedSpaceGroups.has(space.map_id)) {
      await initSpaceGroupsCache();
    }
    return (
      cachedSpaceGroups
        .get(space.map_id)
        ?.find((g) => g.id === space.zone_id) ?? null
    );
  },
  isDeleted: (space: DBSpace) => space.is_deleted,
  lightLevel: (space: DBSpace) => getLightLevelById(space.light_level_id),
  number: (space: DBSpace) => space.space_number,
  displayNumber: (space: DBSpace) => space.display_number,
  row: (space: DBSpace) => space.row_num,
  type: (space: DBSpace) => getSpaceTypeById(space.type_id),
};
