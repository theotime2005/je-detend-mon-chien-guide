import cors from "cors";
import express from "express";
import path from "path";

import authentication from "./src/authentication/routes.js";
import { healthCheckRoute } from "./src/shared/routes/health-check-route.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(process.cwd(), "dist")));
server.use(healthCheckRoute);
server.use(authentication);

export default server;
