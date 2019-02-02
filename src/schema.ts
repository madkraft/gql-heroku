import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

export const resolvers = {
  Query: {
    hello: () => "world"
  }
};
