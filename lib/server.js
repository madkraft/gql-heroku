"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
function configureServer() {
    const server = new apollo_server_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        // playground: {
        //   endpoint: "https://us-central1-articles.cloudfunctions.net/api/graphql"
        // },
        engine: {
            apiKey: process.env.ENGINE_API_KEY
        },
        introspection: true
    });
    return server;
}
exports.configureServer = configureServer;
//# sourceMappingURL=server.js.map