import { https } from "firebase-functions";
import { configureServer } from "./server";

const server = configureServer();
const api = https.onRequest(server);
module.exports = { api };
