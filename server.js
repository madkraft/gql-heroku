const apollo = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

function configureServer() {
  const server = new apollo.ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    engine: {
      apiKey: process.env.ENGINE_API_KEY
    },
    introspection: true
  });

  return server;
}

module.exports = configureServer;
