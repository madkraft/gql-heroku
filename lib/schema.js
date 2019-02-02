"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;
exports.resolvers = {
    Query: {
        hello: () => "world"
    }
};
//# sourceMappingURL=schema.js.map