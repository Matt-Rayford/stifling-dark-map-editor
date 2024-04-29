import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-react';

import { UserProvider } from './contexts/user-context';
import { ClerkApolloProvider } from './contexts/clerk-apollo-provider';
import { App } from './components/app';

const CLERK_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
	throw new Error('Missing Publishable Key');
}

const root = createRoot(document.getElementById('root')!);
root.render(
	<ClerkProvider publishableKey={CLERK_KEY}>
		<ClerkLoaded>
			<ClerkApolloProvider>
				<UserProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</UserProvider>
			</ClerkApolloProvider>
		</ClerkLoaded>
	</ClerkProvider>
);
