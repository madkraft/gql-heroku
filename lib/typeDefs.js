"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
  type User {
    id: ID!
    screenName: String!
    statusesCount: Int!
    tweets: [Tweets]!
  }

  type Tweets {
    id: ID!
    text: String!
    userId: String!
    user: User!
    likes: Int!
  }

  type Query {
    tweets: [Tweets]
    user(id: String!): User
  }
`;
//# sourceMappingURL=typeDefs.js.map