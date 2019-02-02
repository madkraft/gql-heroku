"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
function configureServer() {
    const server = new apollo_server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: schema_1.resolvers,
        playground: true,
        engine: {
            apiKey: process.env.ENGINE_API_KEY
        },
        introspection: true
    });
    return server;
}
exports.configureServer = configureServer;
//# sourceMappingURL=server.js.map