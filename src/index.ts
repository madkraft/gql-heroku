// import { https } from "firebase-functions";
// import { configureServer } from "./server";

// const server = configureServer();
// const api = https.onRequest(server);
// module.exports = { api };

import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
