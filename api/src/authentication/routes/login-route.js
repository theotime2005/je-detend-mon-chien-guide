import express from "express";

import { checkRoute } from "../../shared/middlewares/check-route.js";
import { loginController } from "../controllers/login-controller.js";

const router = express.Router();

router.post("/api/authentication/login", checkRoute, loginController);

export { router as loginRoute };
