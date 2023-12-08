import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const providerConfig = {
	domain: process.env.REACT_APP_OAUTH_DOMAIN,
	clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
	authorizationParams: {
		redirect_uri: window.location.origin,
	},
};

const root = createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider {...providerConfig}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Auth0Provider>
);
