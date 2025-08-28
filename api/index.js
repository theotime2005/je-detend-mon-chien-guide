import { config } from "./config.js";
import server from "./server.js";
import { logger } from "./src/shared/logger.js";

const PORT = config.port;
server.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
