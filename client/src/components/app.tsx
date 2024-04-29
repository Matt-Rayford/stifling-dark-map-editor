import { Route, Routes } from 'react-router-dom';

import { Home } from './home';
import { MapEditor } from './map-editor/map-editor';
import { MapForm } from './map-editor/map-form';
import { NavBar } from './nav/nav-bar';
import { TourProvider } from '@reactour/tour';
import { newUserSteps } from '../tours/new-user-steps';
import { useSdUser } from '../contexts/user-context';
import { MapContextProvider } from '../utils/map-context';
import { TheStiflingDarkPage } from './games/the-stifling-dark/the-stifling-dark-page';
import { YourMaps } from './map-editor/your-maps';
import { Games } from './routes/games';

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
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/map/:mapId' element={<MapEditor />} />
					<Route path='/maps' element={<YourMaps />} />
					<Route path='/maps/new' element={<MapForm />} />
					<Route path='/games' element={<Games />} />
					<Route
						path='/games/the-stifling-dark'
						element={<TheStiflingDarkPage />}
					/>
				</Routes>
			</MapContextProvider>
		</TourProvider>
	);
};
