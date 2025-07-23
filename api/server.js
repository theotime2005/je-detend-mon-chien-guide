import cors from "cors";
import express from "express";
import path from "path";

import { loginRoute } from "./src/authentication/routes/login-route.js";
import { registerRoute } from "./src/authentication/routes/register-route.js";
import { healthCheckRoute } from "./src/shared/routes/health-check-route.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(process.cwd(), "dist")));
server.use(healthCheckRoute);
server.use(registerRoute);
server.use(loginRoute);

export default server;
