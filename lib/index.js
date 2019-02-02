"use strict";
// import { https } from "firebase-functions";
// import { configureServer } from "./server";
Object.defineProperty(exports, "__esModule", { value: true });
// const server = configureServer();
// const api = https.onRequest(server);
// module.exports = { api };
const server_1 = require("./server");
const server = server_1.configureServer();
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map