/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query LightLevels {\n  lightLevels {\n    id\n    name\n    movementPoints\n  }\n}": types.LightLevelsDocument,
    "mutation UpdateMapSettings($id: ID, $settings: MapSettingsInput) {\n  map: updateMapSettings(mapId: $id, settings: $settings) {\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n  }\n}": types.UpdateMapSettingsDocument,
    "mutation CreateMap($title: String!, $email: String!) {\n  map: createMap(title: $title, email: $email) {\n    id\n    title\n  }\n}\n\nmutation UploadMapImage($mapId: ID!, $imageUrl: String!) {\n  uploadMapImage(mapId: $mapId, imageUrl: $imageUrl)\n}": types.CreateMapDocument,
    "query LoadMaps {\n  maps {\n    id\n    title\n  }\n}\n\nquery LoadMap($id: ID!) {\n  map(id: $id) {\n    id\n    title\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n    spaces {\n      id\n      number\n      displayNumber\n      type {\n        id\n        iconUrl\n        color\n        name\n        description\n      }\n      lightLevel {\n        id\n        name\n        movementPoints\n      }\n      row\n      col\n      connections\n      isDeleted\n      group {\n        id\n        name\n        prefix\n      }\n    }\n    spaceGroups {\n      id\n      name\n      prefix\n    }\n  }\n}": types.LoadMapsDocument,
    "query SpaceGroups($mapId: ID!) {\n  spaceGroups: mapSpaceGroups(mapId: $mapId) {\n    id\n    name\n    prefix\n  }\n}\n\nmutation AddMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput!) {\n  newGroup: addMapSpaceGroup(mapId: $mapId, group: $group) {\n    id\n    name\n    prefix\n  }\n}\n\nmutation DeleteMapSpaceGroup($mapId: ID!, $groupId: ID!) {\n  wasSuccess: deleteMapSpaceGroup(mapId: $mapId, groupId: $groupId)\n}\n\nmutation UpdateMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput!) {\n  updatedGroup: updateMapSpaceGroup(mapId: $mapId, group: $group) {\n    id\n    name\n    prefix\n  }\n}": types.SpaceGroupsDocument,
    "query SpaceTypes {\n  spaceTypes {\n    id\n    color\n    iconUrl\n    description\n    name\n  }\n}": types.SpaceTypesDocument,
    "mutation DeleteSpace($mapId: ID!, $spaceId: ID!) {\n  deleteSpace(mapId: $mapId, spaceId: $spaceId)\n}\n\nmutation ConnectSpaces($space1Id: ID!, $space2Id: ID!) {\n  connectSpaces(space1Id: $space1Id, space2Id: $space2Id)\n}\n\nmutation DisconnectSpaces($space1Id: ID!, $space2Id: ID!) {\n  disconnectSpaces(space1Id: $space1Id, space2Id: $space2Id)\n}\n\nmutation UpdateSpace($space: SpaceInput!) {\n  updateSpace(space: $space) {\n    id\n  }\n}": types.DeleteSpaceDocument,
    "query User($email: String!) {\n  user(email: $email) {\n    id\n    email\n    viewedSetup\n  }\n}\n\nmutation UpdateUserSettings($userSettings: UserSettingsInput!) {\n  user: updateUserSettings(settings: $userSettings) {\n    id\n    email\n    viewedSetup\n  }\n}": types.UserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query LightLevels {\n  lightLevels {\n    id\n    name\n    movementPoints\n  }\n}"): (typeof documents)["query LightLevels {\n  lightLevels {\n    id\n    name\n    movementPoints\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateMapSettings($id: ID, $settings: MapSettingsInput) {\n  map: updateMapSettings(mapId: $id, settings: $settings) {\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n  }\n}"): (typeof documents)["mutation UpdateMapSettings($id: ID, $settings: MapSettingsInput) {\n  map: updateMapSettings(mapId: $id, settings: $settings) {\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateMap($title: String!, $email: String!) {\n  map: createMap(title: $title, email: $email) {\n    id\n    title\n  }\n}\n\nmutation UploadMapImage($mapId: ID!, $imageUrl: String!) {\n  uploadMapImage(mapId: $mapId, imageUrl: $imageUrl)\n}"): (typeof documents)["mutation CreateMap($title: String!, $email: String!) {\n  map: createMap(title: $title, email: $email) {\n    id\n    title\n  }\n}\n\nmutation UploadMapImage($mapId: ID!, $imageUrl: String!) {\n  uploadMapImage(mapId: $mapId, imageUrl: $imageUrl)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query LoadMaps {\n  maps {\n    id\n    title\n  }\n}\n\nquery LoadMap($id: ID!) {\n  map(id: $id) {\n    id\n    title\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n    spaces {\n      id\n      number\n      displayNumber\n      type {\n        id\n        iconUrl\n        color\n        name\n        description\n      }\n      lightLevel {\n        id\n        name\n        movementPoints\n      }\n      row\n      col\n      connections\n      isDeleted\n      group {\n        id\n        name\n        prefix\n      }\n    }\n    spaceGroups {\n      id\n      name\n      prefix\n    }\n  }\n}"): (typeof documents)["query LoadMaps {\n  maps {\n    id\n    title\n  }\n}\n\nquery LoadMap($id: ID!) {\n  map(id: $id) {\n    id\n    title\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n    spaces {\n      id\n      number\n      displayNumber\n      type {\n        id\n        iconUrl\n        color\n        name\n        description\n      }\n      lightLevel {\n        id\n        name\n        movementPoints\n      }\n      row\n      col\n      connections\n      isDeleted\n      group {\n        id\n        name\n        prefix\n      }\n    }\n    spaceGroups {\n      id\n      name\n      prefix\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query SpaceGroups($mapId: ID!) {\n  spaceGroups: mapSpaceGroups(mapId: $mapId) {\n    id\n    name\n    prefix\n  }\n}\n\nmutation AddMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput!) {\n  newGroup: addMapSpaceGroup(mapId: $mapId, group: $group) {\n    id\n    name\n    prefix\n  }\n}\n\nmutation DeleteMapSpaceGroup($mapId: ID!, $groupId: ID!) {\n  wasSuccess: deleteMapSpaceGroup(mapId: $mapId, groupId: $groupId)\n}\n\nmutation UpdateMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput!) {\n  updatedGroup: updateMapSpaceGroup(mapId: $mapId, group: $group) {\n    id\n    name\n    prefix\n  }\n}"): (typeof documents)["query SpaceGroups($mapId: ID!) {\n  spaceGroups: mapSpaceGroups(mapId: $mapId) {\n    id\n    name\n    prefix\n  }\n}\n\nmutation AddMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput!) {\n  newGroup: addMapSpaceGroup(mapId: $mapId, group: $group) {\n    id\n    name\n    prefix\n  }\n}\n\nmutation DeleteMapSpaceGroup($mapId: ID!, $groupId: ID!) {\n  wasSuccess: deleteMapSpaceGroup(mapId: $mapId, groupId: $groupId)\n}\n\nmutation UpdateMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput!) {\n  updatedGroup: updateMapSpaceGroup(mapId: $mapId, group: $group) {\n    id\n    name\n    prefix\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query SpaceTypes {\n  spaceTypes {\n    id\n    color\n    iconUrl\n    description\n    name\n  }\n}"): (typeof documents)["query SpaceTypes {\n  spaceTypes {\n    id\n    color\n    iconUrl\n    description\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteSpace($mapId: ID!, $spaceId: ID!) {\n  deleteSpace(mapId: $mapId, spaceId: $spaceId)\n}\n\nmutation ConnectSpaces($space1Id: ID!, $space2Id: ID!) {\n  connectSpaces(space1Id: $space1Id, space2Id: $space2Id)\n}\n\nmutation DisconnectSpaces($space1Id: ID!, $space2Id: ID!) {\n  disconnectSpaces(space1Id: $space1Id, space2Id: $space2Id)\n}\n\nmutation UpdateSpace($space: SpaceInput!) {\n  updateSpace(space: $space) {\n    id\n  }\n}"): (typeof documents)["mutation DeleteSpace($mapId: ID!, $spaceId: ID!) {\n  deleteSpace(mapId: $mapId, spaceId: $spaceId)\n}\n\nmutation ConnectSpaces($space1Id: ID!, $space2Id: ID!) {\n  connectSpaces(space1Id: $space1Id, space2Id: $space2Id)\n}\n\nmutation DisconnectSpaces($space1Id: ID!, $space2Id: ID!) {\n  disconnectSpaces(space1Id: $space1Id, space2Id: $space2Id)\n}\n\nmutation UpdateSpace($space: SpaceInput!) {\n  updateSpace(space: $space) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query User($email: String!) {\n  user(email: $email) {\n    id\n    email\n    viewedSetup\n  }\n}\n\nmutation UpdateUserSettings($userSettings: UserSettingsInput!) {\n  user: updateUserSettings(settings: $userSettings) {\n    id\n    email\n    viewedSetup\n  }\n}"): (typeof documents)["query User($email: String!) {\n  user(email: $email) {\n    id\n    email\n    viewedSetup\n  }\n}\n\nmutation UpdateUserSettings($userSettings: UserSettingsInput!) {\n  user: updateUserSettings(settings: $userSettings) {\n    id\n    email\n    viewedSetup\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;