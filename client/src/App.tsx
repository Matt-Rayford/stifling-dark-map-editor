import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { MapEditor } from './MapEditor';
import MapForm from './MapForm';
import NavBar from './NavBar';
import { TourProvider } from '@reactour/tour';
import { newUserSteps } from './tours/new-user-steps';
import { useSdUser } from './contexts/user-context';

export const App = () => {
	const { closeSetupGuide } = useSdUser();

	return (
		<TourProvider
			defaultOpen={false}
			steps={newUserSteps}
			beforeClose={() => {
				if (closeSetupGuide) {
					closeSetupGuide();
				}
			}}
		>
			<NavBar />
			<section className='section'>
				<div className='container'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/map/:mapId' element={<MapEditor />} />
						<Route path='/maps/new' element={<MapForm />} />
					</Routes>
				</div>
			</section>
		</TourProvider>
	);
};
