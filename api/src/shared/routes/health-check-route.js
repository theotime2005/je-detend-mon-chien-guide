import express from "express";
import {healthCheckController} from "../controllers/health-check-controller.js";

const router = express.Router()

router.get('/health', healthCheckController)

export {router as healthCheckRoute};
