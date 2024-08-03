import { pool } from '..';
import { DBUser } from '../types/user';

export const getUser = (email: string, clerkId: string): Promise<DBUser> => {
	const query = 'SELECT * FROM sd_user WHERE email=$1';

	return pool
		.query({
			text: query,
			values: [email],
		})
		.then((r) => {
			if (r.rowCount === 0) {
				return createUser(email, clerkId);
			}
			const user = r.rows?.[0] as DBUser;

			if(!user.clerk_id) {
				return updateUserClerkId(user.id, clerkId);
			}
			return user;
		})
		.catch((e) => {
			console.error(`ERROR - getUser(${email}): `, e);
			throw new Error('Error getting user');
		});
};

const createUser = (email: string, clerkId: string): Promise<DBUser> => {
	const query = 'INSERT INTO sd_user (email, clerk_id) VALUES ($1, $2) RETURNING *';

	return pool
		.query({
			text: query,
			values: [email, clerkId],
		})
		.then((r) => {
			return r.rows?.[0] as DBUser;
		})
		.catch((e) => {
			console.error(`ERROR - createUser(${email}): `, e);
			throw new Error('Error creating user');
		});
};

const updateUserClerkId = (id: string, clerkId: string) => {
	const query = 'UPDATE sd_user SET clerk_id = $2 WHERE id = $1 RETURNING *';

	return pool
		.query({
			text: query,
			values: [id, clerkId],
		})
		.then((r) => {
			return r.rows?.[0] as DBUser;
		})
		.catch((e) => {
			console.error(`ERROR - updateUserClerkId(${id}): `, e);
			throw new Error('Error updateUserClerkId');
		});
}

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
