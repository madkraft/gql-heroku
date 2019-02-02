import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export function configureServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // playground: {
    //   endpoint: "process.env.API_ENDPOINT"
    // },
    engine: {
      apiKey: process.env.ENGINE_API_KEY
    },
    introspection: true
  });

  return server;
}
