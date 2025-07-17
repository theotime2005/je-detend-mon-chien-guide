import express from "express";

import { checkRoute } from "../../shared/middlewares/check-route.js";
import * as registerControllers from "../controllers/register-controller.js";

const router = express.Router();

router.post("/api/authentication/register", checkRoute, registerControllers.createUser);

export { router as registerRoute };
