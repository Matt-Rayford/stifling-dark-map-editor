import { ReactNode, createContext, useContext, useState } from 'react';
import {
	UpdateUserSettingsDocument,
	User,
	UserDocument,
} from '../graphql/__generated__/graphql';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from '@apollo/client';

interface UserContextType {
	initialized: boolean;
	user?: User | null;
	closeSetupGuide?: () => void;
}

const UserContext = createContext<UserContextType>({
	initialized: false,
	user: null,
});

//export const UserProvider = UserContext.Provider;

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [sdUser, setSdUser] = useState<User>();
	const { user } = useAuth0();

	const email = user?.email;
	const skip = !user?.email;

	useQuery(UserDocument, {
		variables: {
			email: email!,
		},
		skip,
		onCompleted: (data) => {
			if (data.user) {
				setSdUser(data.user);
			}
		},
	});

	const [updateUserSettings] = useMutation(UpdateUserSettingsDocument);

	const closeSetupGuide = () => {
		if (email && !sdUser?.viewedSetup) {
			if (sdUser) {
				setSdUser({ ...sdUser, viewedSetup: true });
			}
			updateUserSettings({
				variables: { userSettings: { email, viewedSetup: true } },
				onCompleted: (data) => {
					if (data.user) {
						setSdUser(data.user);
					}
				},
			});
		}
	};

	return (
		<UserContext.Provider
			value={{ initialized: true, user: sdUser, closeSetupGuide }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useSdUser = () => {
	const userContext = useContext(UserContext);
	if (!userContext.initialized) {
		throw new Error('Cannot use hook useSdUser outside of a UserProvider');
	}
	return userContext;
};
