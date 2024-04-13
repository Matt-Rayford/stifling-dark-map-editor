import 'bootstrap/dist/css/bootstrap.min.css';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user-context';
import { ClerkProvider } from '@clerk/clerk-react';

const link = createHttpLink({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT_URL,
	credentials: 'include',
});

const apollClient = new ApolloClient({
	cache: new InMemoryCache(),
	link,
});

const oAuthProviderConfig = {
	domain: process.env.REACT_APP_OAUTH_DOMAIN!,
	clientId: process.env.REACT_APP_OAUTH_CLIENT_ID!,
	authorizationParams: {
		redirect_uri: window.location.origin,
	},
	useCookiesForTransactions: true,
};

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
