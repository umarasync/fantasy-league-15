import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";

export function createApolloClient() {
  const AUTH_TOKEN_NAME = `fe-auth-token`;
  const httpLink = new HttpLink({
    uri: "http://localhost:3333/graphql",//process.env.REACT_APP_GRAPHQL_ENDPOINT,
    credentials: `include`,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: localStorage.getItem(AUTH_TOKEN_NAME) || null,
      },
    }));

    return forward(operation);
  });

  return new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache({
      addTypename: true,
      resultCaching: true,
    }),
  });
}
