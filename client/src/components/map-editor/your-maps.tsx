import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTour } from '@reactour/tour';
import {
	LoadMapsDocument,
	Map as SDMap,
} from '../../graphql/__generated__/graphql';
import { useSdUser } from '../../contexts/user-context';
import { SignInButton, useUser } from '@clerk/clerk-react';

export const YourMaps = () => {
	const [maps, setMaps] = useState<Pick<SDMap, 'id' | 'title'>[]>([]);
	const navigate = useNavigate();

	const { setIsOpen } = useTour();

	const { isSignedIn } = useUser();
	const { user } = useSdUser();

	const { data, loading: mapsLoading } = useQuery(LoadMapsDocument, {
		nextFetchPolicy: 'network-only',
	});

	useEffect(() => {
		if (!mapsLoading && isSignedIn) {
			if (data?.maps) {
				setMaps(data.maps.filter((m) => !!m));
			}
		}
	}, [data, mapsLoading, isSignedIn]);

	if (user && !user.viewedSetup) {
		setIsOpen(true);
	} else {
		setIsOpen(false);
	}

	return (
		<div className='content-container'>
			{!isSignedIn && (
				<div>
					<h1>Create an Account to use the Stifling Dark Map Editor</h1>
					<p>
						<SignInButton>
							<button className='btn btn-primary'>Create Account</button>
						</SignInButton>
					</p>
				</div>
			)}
			{isSignedIn && (
				<div id='your-maps' className='content-container'>
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
		</div>
	);
};
