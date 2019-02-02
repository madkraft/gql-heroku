import { ApolloServer } from "apollo-server";

import { resolvers, typeDefs } from "./schema";

export function configureServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    // playground: {
    //   endpoint: "https://us-central1-articles.cloudfunctions.net/api/graphql"
    // },
    // engine: {
    //   apiKey: process.env.ENGINE_API_KEY
    // },
    introspection: true
  });

  // server.applyMiddleware({
  //   app,
  //   cors: false
  // });

  return server;
}
