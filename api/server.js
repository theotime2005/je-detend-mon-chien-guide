import cors from "cors";
import express from "express";
import path from "path";

import dogs from "./src/dogs/routes.js";
import authentication from "./src/identities-access-management/routes.js";
import { healthCheckRoute } from "./src/shared/health-check/health-check-route.js";
import { logger } from "./src/shared/logger.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(process.cwd(), "dist")));
server.use((req, res, next) => {
  res.on("finish", () => {
    logger.info(`${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
});
server.use(healthCheckRoute);
server.use(authentication);
server.use(dogs);


export default server;
