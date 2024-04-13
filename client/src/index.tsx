import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { App } from './components/app';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { setContext } from '@apollo/client/link/context';

import { UserProvider } from './contexts/user-context';

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT_URL,
	credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const apollClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: httpLink,
});

const CLERK_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
	throw new Error('Missing Publishable Key');
}

const root = createRoot(document.getElementById('root')!);
root.render(
	<ClerkProvider publishableKey={CLERK_KEY}>
		<ApolloProvider client={apollClient}>
			<UserProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</UserProvider>
		</ApolloProvider>
	</ClerkProvider>
);
