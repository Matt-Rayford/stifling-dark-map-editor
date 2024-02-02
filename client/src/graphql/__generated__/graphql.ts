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
  horizontalSpacing?: InputMaybe<Scalars['Float']['input']>;
  indent?: InputMaybe<Scalars['Float']['input']>;
  paddingX?: InputMaybe<Scalars['Float']['input']>;
  paddingY?: InputMaybe<Scalars['Float']['input']>;
  spaceColor?: InputMaybe<Scalars['String']['input']>;
  spaceRadius?: InputMaybe<Scalars['Float']['input']>;
  verticalSpacing?: InputMaybe<Scalars['Float']['input']>;
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
  updateMapSettings?: Maybe<Map>;
  updateMapSpaceGroup?: Maybe<SpaceGroup>;
  updateSpace?: Maybe<Space>;
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
  title?: InputMaybe<Scalars['String']['input']>;
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


export type MutationUploadMapImageArgs = {
  imageUrl: Scalars['String']['input'];
  mapId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  lightLevels?: Maybe<Array<Maybe<LightLevel>>>;
  map?: Maybe<Map>;
  mapSpaceGroups?: Maybe<Array<Maybe<SpaceGroup>>>;
  mapSpaces?: Maybe<Array<Maybe<Space>>>;
  maps: Array<Map>;
  spaceTypes?: Maybe<Array<Maybe<SpaceType>>>;
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
};

export type SpaceSetting = {
  __typename?: 'SpaceSetting';
  fontColor?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
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

export type LoadMapsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoadMapsQuery = { __typename?: 'Query', maps: Array<{ __typename?: 'Map', id: string, title: string }> };

export type LoadMapQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LoadMapQuery = { __typename?: 'Query', map?: { __typename?: 'Map', id: string, title: string, settings: { __typename?: 'MapSettings', backgroundImageUrl?: string | null, spaceColor: string, horizontalSpacing: number, verticalSpacing: number, indent: number, paddingX: number, paddingY: number, spaceRadius: number }, spaces: Array<{ __typename?: 'Space', id: string, number: number, displayNumber: number, row: number, col: number, connections: Array<number>, isDeleted?: boolean | null, type: { __typename?: 'SpaceType', id: string, color: string, name: string, description: string }, lightLevel: { __typename?: 'LightLevel', id: string, name: string, movementPoints: number }, group?: { __typename?: 'SpaceGroup', id: string, name: string, prefix: string } | null }>, spaceGroups?: Array<{ __typename?: 'SpaceGroup', id: string, name: string, prefix: string }> | null } | null };


export const LoadMapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadMaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<LoadMapsQuery, LoadMapsQueryVariables>;
export const LoadMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"map"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"spaceColor"}},{"kind":"Field","name":{"kind":"Name","value":"horizontalSpacing"}},{"kind":"Field","name":{"kind":"Name","value":"verticalSpacing"}},{"kind":"Field","name":{"kind":"Name","value":"indent"}},{"kind":"Field","name":{"kind":"Name","value":"paddingX"}},{"kind":"Field","name":{"kind":"Name","value":"paddingY"}},{"kind":"Field","name":{"kind":"Name","value":"spaceRadius"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"displayNumber"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lightLevel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"movementPoints"}}]}},{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"col"}},{"kind":"Field","name":{"kind":"Name","value":"connections"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaceGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}}]}}]}}]}}]} as unknown as DocumentNode<LoadMapQuery, LoadMapQueryVariables>;