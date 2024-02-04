import { pool } from '..';
import { DBUser } from '../types/user';

export const getUser = (email: string): Promise<DBUser> => {
	const query = 'SELECT * FROM sd_user WHERE email=$1';

	return pool
		.query({
			text: query,
			values: [email],
		})
		.then((r) => {
			if (r.rowCount === 0) {
				return createUser(email);
			}
			return r.rows?.[0] as DBUser;
		})
		.catch((e) => {
			console.error(`ERROR - getUser(${email}): `, e);
			throw new Error('Error getting user');
		});
};

const createUser = (email: string): Promise<DBUser> => {
	const query = 'INSERT INTO sd_user (email) VALUES ($1) RETURNING *';

	return pool
		.query({
			text: query,
			values: [email],
		})
		.then((r) => {
			return r.rows?.[0] as DBUser;
		})
		.catch((e) => {
			console.error(`ERROR - getUser(${email}): `, e);
			throw new Error('Error getting user');
		});
};

export const updateUserSettings = (
	email: string,
	viewedSetup: boolean
): Promise<DBUser> => {
	const query = 'UPDATE sd_user SET viewed_setup=$2 WHERE email=$1 RETURNING *';

	return pool
		.query({
			text: query,
			values: [email, viewedSetup],
		})
		.then((r) => {
			return r.rows?.[0] as DBUser;
		})
		.catch((e) => {
			console.error(`ERROR - updateUserSettings(${email}): `, e);
			throw new Error('Error updating user settings');
		});
};

export const User = {
	viewedSetup: (user: DBUser) => user.viewed_setup,
};
