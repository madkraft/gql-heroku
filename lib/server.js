"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express = require("express");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
function configureServer() {
    const app = express();
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
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
exports.configureServer = configureServer;
//# sourceMappingURL=server.js.map