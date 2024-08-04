import { Query } from './resolvers/query';
import { Space } from './resolvers/tsd-map/space';
import { Map } from './resolvers/tsd-map/map';
import { Mutation } from './resolvers/mutation';
import { LightLevel } from './resolvers/tsd-map/light-level';
import { MapSettings } from './resolvers/tsd-map/map-settings';
import { User } from './resolvers/tsd-map/user';
import { SpaceType } from './resolvers/tsd-map/space-type';
import { RetailAccount } from './resolvers/retail/retail-account';
import { RetailProperty } from './resolvers/retail/retail-property';
import { Contact } from './resolvers/user/contact';

export const resolvers = {
  Query,
  Mutation,
  Contact,
  LightLevel,
  Map,
  MapSettings,
  RetailAccount,
  RetailProperty,
  Space,
  SpaceType,
  User,
};
