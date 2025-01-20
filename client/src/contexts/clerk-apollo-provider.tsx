import { ReactNode, useMemo } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '@clerk/clerk-react';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT_URL,
  credentials: 'include',
});

export const ClerkApolloProvider = ({ children }: { children: ReactNode }) => {
  const { getToken } = useAuth();

  const client = useMemo(() => {
    const authMiddleware = setContext(async (operation, { headers }) => {
      const token = await getToken();

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: from([authMiddleware, httpLink]),
    });
  }, [getToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
