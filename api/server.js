import cors from "cors";
import express from "express";
import path from "path";

import authentication from "./src/authentication/routes.js";
import { logger } from "./src/shared/logger.js";
import { healthCheckRoute } from "./src/shared/routes/health-check-route.js";
import userRoute from "./src/shared/routes/user-route.js";

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
server.use(userRoute);


export default server;
