import { Query } from './resolvers/query';
import { Space } from './resolvers/space';
import { Map } from './resolvers/map';
import { Mutation } from './resolvers/mutation';
import { LightLevel } from './resolvers/light-level';
import { MapSettings } from './resolvers/map-settings';
import { User } from './resolvers/user';
import { SpaceType } from './resolvers/space-type';
import { RetailAccount } from './resolvers/retail/retail-account';

export const resolvers = {
  Query,
  Mutation,
  LightLevel,
  Map,
  MapSettings,
  RetailAccount,
  Space,
  SpaceType,
  User,
};
