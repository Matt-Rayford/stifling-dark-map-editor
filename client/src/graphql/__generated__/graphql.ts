/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Array: { input: any; output: any; }
  Object: { input: any; output: any; }
};

export type Contact = {
  __typename?: 'Contact';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type ContactInput = {
  emailAddress: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type CreateMapInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LightLevel = {
  __typename?: 'LightLevel';
  id: Scalars['ID']['output'];
  movementPoints: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Map = {
  __typename?: 'Map';
  id: Scalars['ID']['output'];
  settings: MapSettings;
  spaceGroups?: Maybe<Array<SpaceGroup>>;
  spaces: Array<Space>;
  title: Scalars['String']['output'];
};

export type MapSettings = {
  __typename?: 'MapSettings';
  backgroundImageUrl?: Maybe<Scalars['String']['output']>;
  horizontalSpacing: Scalars['Float']['output'];
  indent: Scalars['Float']['output'];
  paddingX: Scalars['Float']['output'];
  paddingY: Scalars['Float']['output'];
  spaceColor: Scalars['String']['output'];
  spaceRadius: Scalars['Float']['output'];
  verticalSpacing: Scalars['Float']['output'];
};

export type MapSettingsInput = {
  backgroundImageUrl?: InputMaybe<Scalars['String']['input']>;
  spaceColor?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMapSpaceGroup?: Maybe<SpaceGroup>;
  connectSpaces?: Maybe<Scalars['Boolean']['output']>;
  createMap?: Maybe<Map>;
  deleteMapSpaceGroup?: Maybe<Scalars['Boolean']['output']>;
  deleteSpace?: Maybe<Scalars['Boolean']['output']>;
  disconnectSpaces?: Maybe<Scalars['Boolean']['output']>;
  renameMap?: Maybe<Scalars['String']['output']>;
  requestRetailAccount?: Maybe<RetailAccount>;
  updateMapSettings?: Maybe<Map>;
  updateMapSpaceGroup?: Maybe<SpaceGroup>;
  updateSpace?: Maybe<Space>;
  updateUserSettings?: Maybe<User>;
  uploadMapImage?: Maybe<Scalars['String']['output']>;
};


export type MutationAddMapSpaceGroupArgs = {
  group: SpaceGroupInput;
  mapId: Scalars['ID']['input'];
};


export type MutationConnectSpacesArgs = {
  space1Id: Scalars['ID']['input'];
  space2Id: Scalars['ID']['input'];
};


export type MutationCreateMapArgs = {
  email: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteMapSpaceGroupArgs = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  mapId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteSpaceArgs = {
  mapId: Scalars['ID']['input'];
  spaceId: Scalars['ID']['input'];
};


export type MutationDisconnectSpacesArgs = {
  space1Id: Scalars['ID']['input'];
  space2Id: Scalars['ID']['input'];
};


export type MutationRenameMapArgs = {
  mapId: Scalars['ID']['input'];
  mapName: Scalars['String']['input'];
};


export type MutationRequestRetailAccountArgs = {
  addressInfo: RetailAddressInput;
  retailAccountInfo: RetailAccountInput;
};


export type MutationUpdateMapSettingsArgs = {
  mapId?: InputMaybe<Scalars['ID']['input']>;
  settings?: InputMaybe<MapSettingsInput>;
};


export type MutationUpdateMapSpaceGroupArgs = {
  group: SpaceGroupInput;
  mapId: Scalars['ID']['input'];
};


export type MutationUpdateSpaceArgs = {
  space: SpaceInput;
};


export type MutationUpdateUserSettingsArgs = {
  settings: UserSettingsInput;
};


export type MutationUploadMapImageArgs = {
  imageUrl: Scalars['String']['input'];
  mapId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getRetailAccount?: Maybe<RetailAccount>;
  lightLevels?: Maybe<Array<LightLevel>>;
  map?: Maybe<Map>;
  mapSpaceGroups?: Maybe<Array<SpaceGroup>>;
  mapSpaces?: Maybe<Array<Maybe<Space>>>;
  maps: Array<Map>;
  retailAccountsToVerify?: Maybe<Array<RetailAccount>>;
  spaceTypes?: Maybe<Array<SpaceType>>;
  user: User;
};


export type QueryMapArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMapSpaceGroupsArgs = {
  mapId: Scalars['ID']['input'];
};


export type QueryMapSpacesArgs = {
  mapId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  email: Scalars['String']['input'];
};

export type RetailAccount = {
  __typename?: 'RetailAccount';
  addresses: Array<RetailAddress>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rejected: Scalars['Boolean']['output'];
  taxId: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type RetailAccountInput = {
  name: Scalars['String']['input'];
  taxId: Scalars['String']['input'];
};

export type RetailAddress = {
  __typename?: 'RetailAddress';
  city: Scalars['String']['output'];
  contact: Contact;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  streetAddress: Scalars['String']['output'];
};

export type RetailAddressInput = {
  city: Scalars['String']['input'];
  contact: ContactInput;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  streetAddress: Scalars['String']['input'];
};

export type Space = {
  __typename?: 'Space';
  col: Scalars['Int']['output'];
  connections: Array<Scalars['Int']['output']>;
  displayNumber: Scalars['Int']['output'];
  group?: Maybe<SpaceGroup>;
  id: Scalars['ID']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  lightLevel: LightLevel;
  number: Scalars['Int']['output'];
  row: Scalars['Int']['output'];
  type: SpaceType;
};

export type SpaceGroup = {
  __typename?: 'SpaceGroup';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  prefix: Scalars['String']['output'];
};

export type SpaceGroupInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  prefix: Scalars['String']['input'];
};

export type SpaceInput = {
  connections?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  groupId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  lightLevelId?: InputMaybe<Scalars['ID']['input']>;
  spaceGroupId?: InputMaybe<Scalars['ID']['input']>;
  typeId?: InputMaybe<Scalars['ID']['input']>;
};

export type SpaceSetting = {
  __typename?: 'SpaceSetting';
  fontColor?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  spaceColor?: Maybe<Scalars['String']['output']>;
};

export type SpaceType = {
  __typename?: 'SpaceType';
  color: Scalars['String']['output'];
  description: Scalars['String']['output'];
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  viewedSetup: Scalars['Boolean']['output'];
};

export type UserSettingsInput = {
  email: Scalars['String']['input'];
  viewedSetup?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LightLevelsQueryVariables = Exact<{ [key: string]: never; }>;


export type LightLevelsQuery = { __typename?: 'Query', lightLevels?: Array<{ __typename?: 'LightLevel', id: string, name: string, movementPoints: number }> | null };

export type UpdateMapSettingsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  settings?: InputMaybe<MapSettingsInput>;
}>;


export type UpdateMapSettingsMutation = { __typename?: 'Mutation', map?: { __typename?: 'Map', settings: { __typename?: 'MapSettings', backgroundImageUrl?: string | null, spaceColor: string, horizontalSpacing: number, verticalSpacing: number, indent: number, paddingX: number, paddingY: number, spaceRadius: number } } | null };

export type CreateMapMutationVariables = Exact<{
  title: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateMapMutation = { __typename?: 'Mutation', map?: { __typename?: 'Map', id: string, title: string } | null };

export type UploadMapImageMutationVariables = Exact<{
  mapId: Scalars['ID']['input'];
  imageUrl: Scalars['String']['input'];
}>;


export type UploadMapImageMutation = { __typename?: 'Mutation', uploadMapImage?: string | null };

export type LoadMapsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoadMapsQuery = { __typename?: 'Query', maps: Array<{ __typename?: 'Map', id: string, title: string }> };

export type LoadMapQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LoadMapQuery = { __typename?: 'Query', map?: { __typename?: 'Map', id: string, title: string, settings: { __typename?: 'MapSettings', backgroundImageUrl?: string | null, spaceColor: string, horizontalSpacing: number, verticalSpacing: number, indent: number, paddingX: number, paddingY: number, spaceRadius: number }, spaces: Array<{ __typename?: 'Space', id: string, number: number, displayNumber: number, row: number, col: number, connections: Array<number>, isDeleted?: boolean | null, type: { __typename?: 'SpaceType', id: string, iconUrl?: string | null, color: string, name: string, description: string }, lightLevel: { __typename?: 'LightLevel', id: string, name: string, movementPoints: number }, group?: { __typename?: 'SpaceGroup', id: string, name: string, prefix: string } | null }>, spaceGroups?: Array<{ __typename?: 'SpaceGroup', id: string, name: string, prefix: string }> | null } | null };

export type RetailAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type RetailAccountQuery = { __typename?: 'Query', retailAccount?: { __typename?: 'RetailAccount', id: string, name: string, verified: boolean, rejected: boolean } | null };

export type FullRetailAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type FullRetailAccountQuery = { __typename?: 'Query', retailAccount?: { __typename?: 'RetailAccount', id: string, name: string, verified: boolean, rejected: boolean, addresses: Array<{ __typename?: 'RetailAddress', id: string, city: string, name?: string | null, streetAddress: string, postalCode: string, contact: { __typename?: 'Contact', id: string, email: string, name: string, phoneNumber: string } }> } | null };

export type RetailAccountsToVerifyQueryVariables = Exact<{ [key: string]: never; }>;


export type RetailAccountsToVerifyQuery = { __typename?: 'Query', retailAccounts?: Array<{ __typename?: 'RetailAccount', id: string, name: string, taxId: string, verified: boolean, rejected: boolean }> | null };

export type RequestRetailAccountMutationVariables = Exact<{
  retailAccountInfo: RetailAccountInput;
  addressInfo: RetailAddressInput;
}>;


export type RequestRetailAccountMutation = { __typename?: 'Mutation', retailAccount?: { __typename?: 'RetailAccount', id: string, name: string, verified: boolean, rejected: boolean } | null };

export type SpaceGroupsQueryVariables = Exact<{
  mapId: Scalars['ID']['input'];
}>;


export type SpaceGroupsQuery = { __typename?: 'Query', spaceGroups?: Array<{ __typename?: 'SpaceGroup', id: string, name: string, prefix: string }> | null };

export type AddMapSpaceGroupMutationVariables = Exact<{
  mapId: Scalars['ID']['input'];
  group: SpaceGroupInput;
}>;


export type AddMapSpaceGroupMutation = { __typename?: 'Mutation', newGroup?: { __typename?: 'SpaceGroup', id: string, name: string, prefix: string } | null };

export type DeleteMapSpaceGroupMutationVariables = Exact<{
  mapId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
}>;


export type DeleteMapSpaceGroupMutation = { __typename?: 'Mutation', wasSuccess?: boolean | null };

export type UpdateMapSpaceGroupMutationVariables = Exact<{
  mapId: Scalars['ID']['input'];
  group: SpaceGroupInput;
}>;


export type UpdateMapSpaceGroupMutation = { __typename?: 'Mutation', updatedGroup?: { __typename?: 'SpaceGroup', id: string, name: string, prefix: string } | null };

export type SpaceTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type SpaceTypesQuery = { __typename?: 'Query', spaceTypes?: Array<{ __typename?: 'SpaceType', id: string, color: string, iconUrl?: string | null, description: string, name: string }> | null };

export type DeleteSpaceMutationVariables = Exact<{
  mapId: Scalars['ID']['input'];
  spaceId: Scalars['ID']['input'];
}>;


export type DeleteSpaceMutation = { __typename?: 'Mutation', deleteSpace?: boolean | null };

export type ConnectSpacesMutationVariables = Exact<{
  space1Id: Scalars['ID']['input'];
  space2Id: Scalars['ID']['input'];
}>;


export type ConnectSpacesMutation = { __typename?: 'Mutation', connectSpaces?: boolean | null };

export type DisconnectSpacesMutationVariables = Exact<{
  space1Id: Scalars['ID']['input'];
  space2Id: Scalars['ID']['input'];
}>;


export type DisconnectSpacesMutation = { __typename?: 'Mutation', disconnectSpaces?: boolean | null };

export type UpdateSpaceMutationVariables = Exact<{
  space: SpaceInput;
}>;


export type UpdateSpaceMutation = { __typename?: 'Mutation', updateSpace?: { __typename?: 'Space', id: string } | null };

export type UserQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, viewedSetup: boolean } };

export type UpdateUserSettingsMutationVariables = Exact<{
  userSettings: UserSettingsInput;
}>;


export type UpdateUserSettingsMutation = { __typename?: 'Mutation', user?: { __typename?: 'User', id: string, email: string, viewedSetup: boolean } | null };


export const LightLevelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LightLevels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lightLevels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"movementPoints"}}]}}]}}]} as unknown as DocumentNode<LightLevelsQuery, LightLevelsQueryVariables>;
export const UpdateMapSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMapSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MapSettingsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"map"},"name":{"kind":"Name","value":"updateMapSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"spaceColor"}},{"kind":"Field","name":{"kind":"Name","value":"horizontalSpacing"}},{"kind":"Field","name":{"kind":"Name","value":"verticalSpacing"}},{"kind":"Field","name":{"kind":"Name","value":"indent"}},{"kind":"Field","name":{"kind":"Name","value":"paddingX"}},{"kind":"Field","name":{"kind":"Name","value":"paddingY"}},{"kind":"Field","name":{"kind":"Name","value":"spaceRadius"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMapSettingsMutation, UpdateMapSettingsMutationVariables>;
export const CreateMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"map"},"name":{"kind":"Name","value":"createMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateMapMutation, CreateMapMutationVariables>;
export const UploadMapImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadMapImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadMapImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}}}]}]}}]} as unknown as DocumentNode<UploadMapImageMutation, UploadMapImageMutationVariables>;
export const LoadMapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadMaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<LoadMapsQuery, LoadMapsQueryVariables>;
export const LoadMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"map"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"spaceColor"}},{"kind":"Field","name":{"kind":"Name","value":"horizontalSpacing"}},{"kind":"Field","name":{"kind":"Name","value":"verticalSpacing"}},{"kind":"Field","name":{"kind":"Name","value":"indent"}},{"kind":"Field","name":{"kind":"Name","value":"paddingX"}},{"kind":"Field","name":{"kind":"Name","value":"paddingY"}},{"kind":"Field","name":{"kind":"Name","value":"spaceRadius"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"displayNumber"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lightLevel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"movementPoints"}}]}},{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"col"}},{"kind":"Field","name":{"kind":"Name","value":"connections"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaceGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}}]}}]}}]}}]} as unknown as DocumentNode<LoadMapQuery, LoadMapQueryVariables>;
export const RetailAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RetailAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"retailAccount"},"name":{"kind":"Name","value":"getRetailAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"rejected"}}]}}]}}]} as unknown as DocumentNode<RetailAccountQuery, RetailAccountQueryVariables>;
export const FullRetailAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FullRetailAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"retailAccount"},"name":{"kind":"Name","value":"getRetailAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"rejected"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FullRetailAccountQuery, FullRetailAccountQueryVariables>;
export const RetailAccountsToVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RetailAccountsToVerify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"retailAccounts"},"name":{"kind":"Name","value":"retailAccountsToVerify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"taxId"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"rejected"}}]}}]}}]} as unknown as DocumentNode<RetailAccountsToVerifyQuery, RetailAccountsToVerifyQueryVariables>;
export const RequestRetailAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestRetailAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"retailAccountInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RetailAccountInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RetailAddressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"retailAccount"},"name":{"kind":"Name","value":"requestRetailAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"retailAccountInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"retailAccountInfo"}}},{"kind":"Argument","name":{"kind":"Name","value":"addressInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"rejected"}}]}}]}}]} as unknown as DocumentNode<RequestRetailAccountMutation, RequestRetailAccountMutationVariables>;
export const SpaceGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SpaceGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"spaceGroups"},"name":{"kind":"Name","value":"mapSpaceGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}}]}}]}}]} as unknown as DocumentNode<SpaceGroupsQuery, SpaceGroupsQueryVariables>;
export const AddMapSpaceGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMapSpaceGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"group"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SpaceGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"newGroup"},"name":{"kind":"Name","value":"addMapSpaceGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}}},{"kind":"Argument","name":{"kind":"Name","value":"group"},"value":{"kind":"Variable","name":{"kind":"Name","value":"group"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}}]}}]}}]} as unknown as DocumentNode<AddMapSpaceGroupMutation, AddMapSpaceGroupMutationVariables>;
export const DeleteMapSpaceGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMapSpaceGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasSuccess"},"name":{"kind":"Name","value":"deleteMapSpaceGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}]}]}}]} as unknown as DocumentNode<DeleteMapSpaceGroupMutation, DeleteMapSpaceGroupMutationVariables>;
export const UpdateMapSpaceGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMapSpaceGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"group"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SpaceGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updatedGroup"},"name":{"kind":"Name","value":"updateMapSpaceGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}}},{"kind":"Argument","name":{"kind":"Name","value":"group"},"value":{"kind":"Variable","name":{"kind":"Name","value":"group"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}}]}}]}}]} as unknown as DocumentNode<UpdateMapSpaceGroupMutation, UpdateMapSpaceGroupMutationVariables>;
export const SpaceTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SpaceTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spaceTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SpaceTypesQuery, SpaceTypesQueryVariables>;
export const DeleteSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}}},{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}}]}]}}]} as unknown as DocumentNode<DeleteSpaceMutation, DeleteSpaceMutationVariables>;
export const ConnectSpacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConnectSpaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"space1Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"space2Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"connectSpaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"space1Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"space1Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"space2Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"space2Id"}}}]}]}}]} as unknown as DocumentNode<ConnectSpacesMutation, ConnectSpacesMutationVariables>;
export const DisconnectSpacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisconnectSpaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"space1Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"space2Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disconnectSpaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"space1Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"space1Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"space2Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"space2Id"}}}]}]}}]} as unknown as DocumentNode<DisconnectSpacesMutation, DisconnectSpacesMutationVariables>;
export const UpdateSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"space"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SpaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"space"},"value":{"kind":"Variable","name":{"kind":"Name","value":"space"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSpaceMutation, UpdateSpaceMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"viewedSetup"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UpdateUserSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSettings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"updateUserSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSettings"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"viewedSetup"}}]}}]}}]} as unknown as DocumentNode<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;