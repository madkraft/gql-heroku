"use strict";
// import { https } from "firebase-functions";
// import { configureServer } from "./server";
Object.defineProperty(exports, "__esModule", { value: true });
// const server = configureServer();
// const api = https.onRequest(server);
// module.exports = { api };
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
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
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map