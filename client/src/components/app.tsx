import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { MapEditor } from './map-editor/map-editor';
import { MapForm } from './map-editor/map-form';
import { NavBar } from './nav/nav-bar';
import { TourProvider } from '@reactour/tour';
import { newUserSteps } from '../tours/new-user-steps';
import { useSdUser } from '../contexts/user-context';
import { MapContextProvider } from '../utils/map-context';
import { OurGames } from './games/our-games';
import { TheStiflingDarkPage } from './games/the-stifling-dark/the-stifling-dark';

export const App = () => {
	const { closeSetupGuide } = useSdUser();

	return (
		<TourProvider
			defaultOpen={false}
			steps={newUserSteps}
			onClickClose={({ setIsOpen }) => {
				setIsOpen(false);
				if (closeSetupGuide) {
					closeSetupGuide();
				}
			}}
		>
			<MapContextProvider>
				<NavBar />
				<div className='container'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/map/:mapId' element={<MapEditor />} />
						<Route path='/maps/new' element={<MapForm />} />
						<Route path='/games' element={<OurGames />} />
						<Route
							path='/games/the-stifling-dark'
							element={<TheStiflingDarkPage />}
						/>
					</Routes>
				</div>
			</MapContextProvider>
		</TourProvider>
	);
};
