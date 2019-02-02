import { ApolloServer } from "apollo-server";

import { resolvers, typeDefs } from "./schema";

export function configureServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    engine: {
      apiKey: process.env.ENGINE_API_KEY
    },
    introspection: true
  });

  return server;
}
