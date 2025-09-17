import express from "express";

import { checkRoute } from "../shared/middlewares/check-route.js";
import { activateUserController } from "./controllers/activate-user-controller.js";
import { loginController } from "./controllers/login-controller.js";
import { registerController } from "./controllers/register-controller.js";

const authentication = express.Router();

authentication.post("/api/authentication/login", checkRoute, loginController);
authentication.post("/api/authentication/register", checkRoute, registerController);
authentication.patch("/api/authentication/register", checkRoute, activateUserController);

export default authentication;
