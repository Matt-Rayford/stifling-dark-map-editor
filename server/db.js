const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

export const maps = store.collection('maps');
export const spaceSettings = store.collection('space-settings');

export * as db from './db';
