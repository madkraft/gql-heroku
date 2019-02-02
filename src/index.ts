// import { https } from "firebase-functions";
// import { configureServer } from "./server";

// const server = configureServer();
// const api = https.onRequest(server);
// module.exports = { api };

import { configureServer } from "./server";

const server = configureServer();

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
