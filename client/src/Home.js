import React, { Component, useEffect, useState } from 'react';
import { loadMaps } from './utils/requests';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
	const [maps, setMaps] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const load = async () => {
			const maps = await loadMaps();
			setMaps(maps);
		};
		load();
	}, []);

	return (
		<div>
			<h1>Your Maps</h1>
			{maps.map((mapData) => {
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
	);
};
