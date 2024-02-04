import 'bootstrap/dist/css/bootstrap.min.css';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './contexts/user-context';

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

const root = createRoot(document.getElementById('root')!);
root.render(
	<Auth0Provider {...oAuthProviderConfig}>
		<ApolloProvider client={apollClient}>
			<UserProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</UserProvider>
		</ApolloProvider>
	</Auth0Provider>
);
