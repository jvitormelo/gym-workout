import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_API_URI);

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URI,
  cache: new InMemoryCache(),
});
