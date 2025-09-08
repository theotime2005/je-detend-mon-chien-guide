import express from "express";

import { checkRoute } from "../shared/middlewares/check-route.js";
import { checkUserToken } from "../shared/middlewares/check-user-token.js";
import { createDogController } from "./controllers/create-dog-controller.js";
import { getDogForUserController } from "./controllers/get-dog-for-user-controller.js";

const dogs = express.Router();

dogs.post("/api/dogs", checkRoute, checkUserToken, createDogController);
dogs.get("/api/dogs/user", checkRoute, checkUserToken, getDogForUserController);

export default dogs;
