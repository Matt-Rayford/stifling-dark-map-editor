const db = require('./db');

const Query = {
	map: (root, { id }) => db.maps.get(id),
	maps: () => db.maps.list(),
	spaceSetting: (root, { id }) => db.spaceSettings.get(id),
	spaceSettings: () => db.spaceSettings.list(),
};

const Mutation = {
	createMap: (root, { title = 'New Map' }) => {
		const id = db.maps.create({
			title,
			spaces: [],
			drawOptions: {
				backgroundImageUrl: '',
				spaceColor: '#cfcfcf',
				horizontalSpacing: 61.0,
				verticalSpacing: 76.0,
				indent: 29.0,
				paddingX: 57.95,
				paddingY: 50.3,
				spaceRadius: 15.0,
			},
		});
		return db.maps.get(id);
	},
	updateMap: (root, { mapId, spaceData, drawOptions }) => {
		const { title, spaceGroups } = db.maps.get(mapId);
		db.maps.update({
			id: mapId,
			title: title,
			drawOptions,
			spaces: spaceData,
			spaceGroups,
		});
		return db.maps.get(mapId);
	},
	updateMapSettings: (root, { mapId, drawOptions }) => {
		const map = db.maps.get(mapId);
		if (!map)
			throw new Error(
				`Cannot update map with id ${mapId}. It does not exist.`
			);
		const { title, spaces, spaceGroups } = map;
		db.maps.update({
			id: mapId,
			title,
			drawOptions,
			spaces,
			spaceGroups,
		});
		return db.maps.get(mapId);
	},
	updateMapSpaceGroup: (root, { mapId, group }) => {
		const map = db.maps.get(mapId);
		if (!map)
			throw new Error(
				`Cannot update map with id ${mapId}. It does not exist.`
			);
		const { spaceGroups } = map;
		if (spaceGroups.some((g) => g.id === group.id)) {
			const existingGroup = spaceGroups.filter(
				(g) => g.id === group.id
			)[0];
			existingGroup.name = group.name;
			existingGroup.prefix = group.prefix;

			db.maps.update({
				id: mapId,
				title: map.title,
				drawOptions: map.drawOptions,
				spaces: map.spaces,
				spaceGroups,
			});
			return db.maps
				.get(mapId)
				.spaceGroups.filter((g) => g.id === group.id)[0];
		} else
			throw new Error(
				`Cannot update space group, since group ${group.id} does not exist`
			);
	},
	addMapSpaceGroup: (root, { mapId, group }) => {
		const map = db.maps.get(mapId);
		if (!map)
			throw new Error(
				`Cannot update map with id ${mapId}. It does not exist.`
			);
		let { spaceGroups } = map;
		if (!spaceGroups || spaceGroups.length === 0) {
			group.id = 0;
			spaceGroups = [];
		} else {
			let maxId = -1;
			for (let group of spaceGroups)
				if (maxId <= group.id) maxId = group.id + 1;

			group.id = maxId;
		}
		spaceGroups.push(group);

		db.maps.update({
			id: mapId,
			title: map.title,
			drawOptions: map.drawOptions,
			spaces: map.spaces,
			spaceGroups,
		});
		return db.maps
			.get(mapId)
			.spaceGroups.filter((g) => g.id === group.id)[0];
	},
	deleteMapSpaceGroup: (root, { mapId, groupId }) => {
		const map = db.maps.get(mapId);
		if (!map)
			throw new Error(
				`Cannot update map with id ${mapId}. It does not exist.`
			);

		let { spaceGroups } = map;
		spaceGroups = spaceGroups.filter((g) => g.id !== parseInt(groupId));

		db.maps.update({
			id: mapId,
			title: map.title,
			drawOptions: map.drawOptions,
			spaces: map.spaces,
			spaceGroups,
		});
		return true;
	},
};

const Space = {
	settings: (space) => db.spaceSettings.get(space.type),
};

module.exports = { Query, Mutation, Space };
