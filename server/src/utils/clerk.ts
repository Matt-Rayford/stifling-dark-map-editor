import { clerkClient, User } from '@clerk/clerk-sdk-node';

export const verifyTokenAndGetUser = async (token: string) => {
	try {
		const data = await clerkClient.verifyToken(token);
		if (data && data.sub) {
			const userId = data.sub;
			const user = await clerkClient.users.getUser(userId.toString());
			if (user) {
				return user;
			} else {
				throw new Error('ERROR: No user found');
			}
		}
	} catch {
		throw new Error('ERROR: Could not verify user');
	}
};


export const verifyTokenAndGetUserEmail = async (token: string) => {
	try {
		const data = await clerkClient.verifyToken(token);
		if (data && data.sub) {
			const userId = data.sub;
			const user = await clerkClient.users.getUser(userId.toString());
			if (user) {
				return user.emailAddresses?.[0].emailAddress;
			} else {
				throw new Error('ERROR: No user found');
			}
		}
	} catch {
		throw new Error('ERROR: Could not verify user');
	}
};

export const getUserEmail = (user: User) => {
	return user.emailAddresses?.[0]?.emailAddress;
}