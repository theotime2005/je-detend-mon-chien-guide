import express from "express";

import userController from "../controllers/userController.js";
import { checkUserToken } from "../middlewares/check-user-token.js";

const userRoute = express.Router();

userRoute.get("/api/authenticated", checkUserToken, userController);

export default userRoute;
