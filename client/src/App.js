import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Home } from './Home';
import { MapEditor } from './MapEditor';
import MapForm from './MapForm';
import NavBar from './NavBar';

export const App = () => {
	const { isLoading, error } = useAuth0();

	if (error) {
		return <div>Failed to load auth: {error.message}</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<NavBar />
			<section className='section'>
				<div className='container'>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route path='/map/:mapId' element={<MapEditor />} />
						<Route exact path='/maps/new' element={<MapForm />} />
					</Routes>
				</div>
			</section>
		</div>
	);
};
