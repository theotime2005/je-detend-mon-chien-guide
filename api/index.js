import express from "express";

import { healthCheckRoute } from "./src/shared/routes/health-check-route.js";

const app = express();

app.use(healthCheckRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
