import { ApolloServer } from "apollo-server-express";
const express = require("express");
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export function configureServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    // playground: {
    //   endpoint: "https://us-central1-articles.cloudfunctions.net/api/graphql"
    // },
    engine: {
      apiKey: process.env.ENGINE_API_KEY
    },
    introspection: true
  });

  server.applyMiddleware({
    app,
    cors: false
  });

  return app;
}
