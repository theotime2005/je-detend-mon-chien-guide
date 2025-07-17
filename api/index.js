import * as dotenv from "dotenv";
import express from "express";

import { config } from "./config.js";
dotenv.config();
import { registerRoute } from "./src/authentication/routes/register-route.js";
import { healthCheckRoute } from "./src/shared/routes/health-check-route.js";

const app = express();

app.use(express.json());
app.use(healthCheckRoute);
app.use(registerRoute);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
