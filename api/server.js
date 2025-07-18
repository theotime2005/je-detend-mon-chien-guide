import cors from "cors";
import express from "express";

import { registerRoute } from "./src/authentication/routes/register-route.js";
import { healthCheckRoute } from "./src/shared/routes/health-check-route.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(healthCheckRoute);
server.use(registerRoute);

export default server;
