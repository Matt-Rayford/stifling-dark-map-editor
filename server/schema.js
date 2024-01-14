const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		maps: [Map]
		map(id: ID!): Map
		spaceSetting(id: String!): SpaceSetting
		spaceSettings: [SpaceSetting]
	}

	type Mutation {
		createMap(title: String): Map
		updateMap(mapId: ID!, spaceData: Object, settings: Object): Map
		updateMapName(mapId: ID!, mapName: String!): Boolean
		updateMapSettings(mapId: ID, settings: Object): Map
		updateMapSpaceGroup(mapId: ID, group: Object): SpaceGroup
		addMapSpaceGroup(mapId: ID, group: Object): SpaceGroup
		deleteMapSpaceGroup(mapId: ID, groupId: ID): Boolean
	}

	type Map {
		id: ID!
		title: String!
		settings: MapSettings
		spaces: [Space]!
		spaceGroups: [SpaceGroup]
	}

	type MapSettings {
		backgroundImageUrl: String
		spaceColor: String
		horizontalSpacing: Float
		verticalSpacing: Float
		indent: Float
		paddingX: Float
		paddingY: Float
		spaceRadius: Float
	}

	scalar Object
	scalar Array

	enum LightLevel {
		BRIGHT
		DIM
		PITCH_BLACK
	}

	enum SpaceTypeEnum {
		ADVERSARY
		BASIC
		DOOR
		INTERACTION
		INVOLVED
		STARTING
	}

	type SpaceGroup {
		id: Int!
		name: String!
		prefix: String!
	}

	type Space {
		id: Int!
		number: Int!
		type: SpaceTypeEnum!
		lightLevel: LightLevel!
		connections: [Int]
		row: Int!
		col: Int!
		settings: SpaceSetting
		isDeleted: Boolean
		group: Int
	}

	type SpaceSetting {
		id: String!
		name: String!
		imageUrl: String
		fontColor: String
		spaceColor: String
	}

	input CreateMapInput {
		title: String
	}
`;

module.exports = typeDefs;
