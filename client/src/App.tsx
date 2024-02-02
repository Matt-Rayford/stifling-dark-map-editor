import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { MapEditor } from './MapEditor';
import MapForm from './MapForm';
import NavBar from './NavBar';

const client = new ApolloClient({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT_URL,
	cache: new InMemoryCache(),
});

export const App = () => {
	return (
		<div>
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
		</div>
	);
};
