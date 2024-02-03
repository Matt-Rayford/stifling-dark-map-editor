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
    "mutation CreateMap($title: String!, $email: String!) {\n  map: createMap(title: $title, email: $email) {\n    id\n    title\n  }\n}": types.CreateMapDocument,
    "query LoadMaps($email: String!) {\n  maps(email: $email) {\n    id\n    title\n  }\n}\n\nquery LoadMap($id: ID!) {\n  map(id: $id) {\n    id\n    title\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n    spaces {\n      id\n      number\n      displayNumber\n      type {\n        id\n        color\n        name\n        description\n      }\n      lightLevel {\n        id\n        name\n        movementPoints\n      }\n      row\n      col\n      connections\n      isDeleted\n      group {\n        id\n        name\n        prefix\n      }\n    }\n    spaceGroups {\n      id\n      name\n      prefix\n    }\n  }\n}": types.LoadMapsDocument,
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
export function gql(source: "mutation CreateMap($title: String!, $email: String!) {\n  map: createMap(title: $title, email: $email) {\n    id\n    title\n  }\n}"): (typeof documents)["mutation CreateMap($title: String!, $email: String!) {\n  map: createMap(title: $title, email: $email) {\n    id\n    title\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query LoadMaps($email: String!) {\n  maps(email: $email) {\n    id\n    title\n  }\n}\n\nquery LoadMap($id: ID!) {\n  map(id: $id) {\n    id\n    title\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n    spaces {\n      id\n      number\n      displayNumber\n      type {\n        id\n        color\n        name\n        description\n      }\n      lightLevel {\n        id\n        name\n        movementPoints\n      }\n      row\n      col\n      connections\n      isDeleted\n      group {\n        id\n        name\n        prefix\n      }\n    }\n    spaceGroups {\n      id\n      name\n      prefix\n    }\n  }\n}"): (typeof documents)["query LoadMaps($email: String!) {\n  maps(email: $email) {\n    id\n    title\n  }\n}\n\nquery LoadMap($id: ID!) {\n  map(id: $id) {\n    id\n    title\n    settings {\n      backgroundImageUrl\n      spaceColor\n      horizontalSpacing\n      verticalSpacing\n      indent\n      paddingX\n      paddingY\n      spaceRadius\n    }\n    spaces {\n      id\n      number\n      displayNumber\n      type {\n        id\n        color\n        name\n        description\n      }\n      lightLevel {\n        id\n        name\n        movementPoints\n      }\n      row\n      col\n      connections\n      isDeleted\n      group {\n        id\n        name\n        prefix\n      }\n    }\n    spaceGroups {\n      id\n      name\n      prefix\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;