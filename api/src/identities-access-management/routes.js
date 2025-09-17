import express from "express";

import { checkRoute } from "../shared/middlewares/check-route.js";
import { checkUserToken } from "../shared/middlewares/check-user-token.js";
import { activateUserController } from "./controllers/activate-user-controller.js";
import getUserInfosController from "./controllers/get-user-infos-controller.js";
import { loginController } from "./controllers/login-controller.js";
import { registerController } from "./controllers/register-controller.js";

const authentication = express.Router();

authentication.post("/api/authentication/login", checkRoute, loginController);
authentication.post("/api/authentication/register", checkRoute, registerController);
authentication.patch("/api/authentication/register", checkRoute, activateUserController);
authentication.get("/api/authenticated", checkUserToken, getUserInfosController);

export default authentication;
