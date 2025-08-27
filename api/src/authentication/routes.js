import express from "express";

import { checkRoute } from "../shared/middlewares/check-route.js";
import { loginController } from "./controllers/login-controller.js";
import { createUser } from "./controllers/register-controller.js";

const authentication = express.Router();

authentication.post("/api/authentication/login", checkRoute, loginController);
authentication.post("/api/authentication/register", checkRoute, createUser);

export default authentication;
