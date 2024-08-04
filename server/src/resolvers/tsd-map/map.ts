import { getMapSettings } from '@/db/tsd-map/map-settings';
import { getMapSpaceGroups } from '@/db/tsd-map/space-group';
import { getMapSpaces } from '@/db/tsd-map/space';

import { DBMap } from '@/types/tsd-map/map';

export const Map = {
  title: (map: DBMap) => map.name,
  settings: (map: DBMap) => getMapSettings(map.id),
  spaces: async (map: DBMap) => {
    const spaces = await getMapSpaces(map.id);
    return spaces;
  },
  spaceGroups: async (map: DBMap) => getMapSpaceGroups(map.id),
};
