import { pool } from '@/index';

import { DBMap } from '@/types/tsd-map/map';
import { MapSettings } from '@/types/tsd-map/map-settings';
import { DBSpaceGroup, SpaceGroup } from '@/types/tsd-map/space-group';

import { cachedSpaceGroups } from '@/utils/cache';

const canUserUpdateMap = (mapId: string, email: string) => {
  const query = 'SELECT COUNT(*) FROM sd_map WHERE id=$1 AND creator_email=$2';
  return pool
    .query({
      text: query,
      values: [mapId, email],
    })
    .then((r) => {
      return r.rows?.[0];
    })
    .catch((e) => {
      console.error(`ERROR - getMap(${mapId}): `, e);
      throw new Error(`Error loading map`);
    });
};

export const getMap = async (mapId: string, email: string): Promise<DBMap> => {
  const query = 'SELECT * FROM sd_map WHERE id=$1 AND creator_email=$2';

  return pool
    .query({
      text: query,
      values: [mapId, email],
    })
    .then((r) => {
      return r.rows?.[0];
    })
    .catch((e) => {
      console.error(`ERROR - getMap(${mapId}): `, e);
      throw new Error(`Error loading map`);
    });
};

export const getMaps = async (email: string): Promise<DBMap[]> => {
  const query = 'SELECT * FROM sd_map WHERE creator_email=$1';

  return pool
    .query({
      text: query,
      values: [email],
    })
    .then((r) => {
      return r.rows;
    })
    .catch((e) => {
      console.error('ERROR - getMaps: ', e);
      throw new Error(`Error loading all maps`);
    });
};

export const createMap = async (
  mapName: string,
  email: string
): Promise<DBMap> => {
  const query = `SELECT create_map($1, $2)`;

  return pool
    .query({
      text: query,
      values: [mapName, email],
    })
    .then((r) => {
      const mapRow = r.rows?.[0];
      if (mapRow) {
        return getMap(mapRow.create_map, email);
      } else {
        throw new Error(`Error creating map`);
      }
    })
    .catch((e) => {
      console.error(`ERROR - createMap(${mapName}): `, e);
      throw new Error(`Error creating map`);
    });
};

export const renameMap = async (
  mapId: string,
  email: string,
  mapName: string
) => {
  canUserUpdateMap(mapId, email);

  const query = 'UPDATE sd_map SET name=$1 where id=$2 RETURNING name';
  return pool
    .query({ text: query, values: [mapName, mapId] })
    .then((r) => {
      return r.rows?.[0];
    })
    .catch((e) => {
      console.error(`ERROR - renameMap(${mapId}, ${mapName}): `, e);
      throw new Error('Error renaming map');
    });
};

export const updateMapSettings = async (
  mapId: string,
  email: string,
  settings: MapSettings
) => {
  canUserUpdateMap(mapId, email);

  const query =
    'UPDATE sd_map_settings \
			SET space_color=$1 \
			WHERE map_id=$2 RETURNING *';

  return await pool
    .query({
      text: query,
      values: [settings.spaceColor, mapId],
    })
    .then((r) => {
      const data = r.rows?.[0];
      return data;
    })
    .catch((e) => {
      console.error(`ERROR - updateMapSettings(${mapId}): `, e);
      throw new Error('Error updating map settings');
    });
};

export const updateMapImage = async (
  mapId: string,
  email: string,
  imageUrl: string
) => {
  canUserUpdateMap(mapId, email);

  const query =
    'UPDATE sd_map_settings SET background_image_url=$1 WHERE map_id=$2 RETURNING background_image_url';

  return pool
    .query({ text: query, values: [imageUrl, mapId] })
    .then((r) => {
      const data = r.rows?.[0];
      return data.background_image_url;
    })
    .catch((e) => {
      console.error(`ERROR - uploadMapImage(${mapId}, ${imageUrl}): `, e);
      throw new Error('Error uploading map image');
    });
};

export const addMapSpaceGroup = async (
  mapId: string,
  email: string,
  group: SpaceGroup
) => {
  canUserUpdateMap(mapId, email);

  const query =
    'INSERT INTO sd_map_space_group (map_id, name, prefix) VALUES ($1, $2, $3) RETURNING *';

  return pool
    .query({
      text: query,
      values: [mapId, group.name, group.prefix],
    })
    .then((r) => {
      const spaceGroup = r.rows?.[0] as DBSpaceGroup;
      cachedSpaceGroups.get(mapId)?.push(spaceGroup);
      return spaceGroup;
    })
    .catch((e) => {
      console.error(`ERROR - addMapSpaceGroup(${mapId}, ${group.name}): `, e);
      throw new Error('Error adding space group');
    });
};

export const deleteMapSpaceGroup = async (
  mapId: string,
  email: string,
  groupId: string
) => {
  canUserUpdateMap(mapId, email);

  const query = 'DELETE FROM sd_map_space_group WHERE id=$1';
  return await pool
    .query({
      text: query,
      values: [groupId],
    })
    .then(() => {
      const spaceGroups = cachedSpaceGroups.get(mapId);
      if (spaceGroups) {
        spaceGroups.splice(
          spaceGroups.findIndex((g) => g.id === groupId),
          1
        );
      }
      return true;
    })
    .catch((e) => {
      console.error(`ERROR - deleteMapSpaceGroup(${mapId}, ${groupId}): `, e);
      throw new Error('Error deleting space group');
    });
};
