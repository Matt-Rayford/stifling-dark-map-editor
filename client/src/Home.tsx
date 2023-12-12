import { useEffect, useState } from 'react';
import { loadMaps } from './utils/requests';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { SDMap } from './models/map';

export const Home = () => {
	const [maps, setMaps] = useState<Pick<SDMap, 'id' | 'title'>[]>([]);
	const navigate = useNavigate();

	const { isLoading, error, user, loginWithRedirect } = useAuth0();
	const isBeta = true;

	useEffect(() => {
		const load = async () => {
			const maps = await loadMaps();
			setMaps(maps);
		};
		if (!isLoading && user) {
			load();
		}
	}, [isLoading, user]);

	if (error) {
		return <div>Failed to load auth: {error.message}</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{!user && !isBeta && (
				<div>
					<h1>
						Create an Account to use the Stifling Dark Map Editor
					</h1>
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
			{(user || isBeta) && (
				<div>
					<h1>Your Maps</h1>
					{maps.map((mapData: any) => {
						return (
							<button
								key={mapData.id}
								type='button'
								className='btn btn-primary'
								onClick={() => navigate(`/map/${mapData.id}`)}
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
