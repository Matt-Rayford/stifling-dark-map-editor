import { DBLightLevel } from '@/types/tsd-map/light-level';

export const LightLevel = {
  movementPoints: (lightLevel: DBLightLevel) => lightLevel.movement_points,
};
