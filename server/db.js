const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
	maps: store.collection('maps'),
	spaceSettings: store.collection('space-settings'),
};
