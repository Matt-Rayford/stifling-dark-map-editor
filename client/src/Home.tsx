import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { useTour } from '@reactour/tour';
import {
	LoadMapsDocument,
	Map as SDMap,
} from './graphql/__generated__/graphql';
import { useSdUser } from './contexts/user-context';

export const Home = () => {
	const [maps, setMaps] = useState<Pick<SDMap, 'id' | 'title'>[]>([]);
	const navigate = useNavigate();
	const { isLoading, error, loginWithRedirect } = useAuth0();
	const { setIsOpen } = useTour();

	const { user } = useSdUser();
	const email = user?.email;
	const skipLoad = !user?.email;

	const { data, loading } = useQuery(LoadMapsDocument, {
		variables: {
			email: email!,
		},
		skip: skipLoad,
	});

	/*
	useEffect(() => {
		const getUserToken = async () => {
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: `https://${'dev-gd8kgt1al3ostlru.us.auth0.com'}/api/v2/`,
						scope: 'read:current_user',
					},
				});
				console.log('Access token: ', accessToken);
				document.cookie = `access_token=${accessToken}`;
			} catch (e) {
				console.log(e);
			}
		};

		getUserToken();
	}, [getAccessTokenSilently, user?.sub]);
	*/

	useEffect(() => {
		if (!loading) {
			if (data?.maps) {
				setMaps(data.maps.filter((m) => !!m));
			}
		}
	}, [data, loading]);

	if (error) {
		return <div>Failed to load auth: {error.message}</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (user && !user.viewedSetup) {
		console.log('Set is open', user.viewedSetup);
		setIsOpen(true);
	} else {
		setIsOpen(false);
	}

	return (
		<>
			{!user && (
				<div>
					<h1>Create an Account to use the Stifling Dark Map Editor</h1>
					<p>
						<button
							className='btn btn-primary'
							onClick={() => loginWithRedirect()}
						>
							Create Account
						</button>
					</p>
				</div>
			)}
			{user && (
				<div id='your-maps'>
					<h1>Your Maps</h1>
					{maps.map((mapData: any) => {
						return (
							<button
								key={mapData.id}
								type='button'
								className='btn btn-primary'
								onClick={() => navigate(`map/${mapData.id}`)}
								style={{ marginRight: '15px' }}
							>
								{mapData.title}
							</button>
						);
					})}
				</div>
			)}
		</>
	);
};
