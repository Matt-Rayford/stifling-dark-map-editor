import { pool } from '@/index';

import { DBMapSettings } from '@/types/tsd-map/map-settings';

export const getMapSettings = async (mapId: string): Promise<DBMapSettings> => {
  const query = 'SELECT * FROM sd_map_settings WHERE map_id=$1';

  return pool
    .query({
      text: query,
      values: [mapId],
    })
    .then((r) => {
      return r.rows?.[0];
    })
    .catch((e) => {
      console.error(`ERROR - getMapSettings(${mapId}): `, e);
      throw new Error(`Error retrieving map settings`);
    });
};
