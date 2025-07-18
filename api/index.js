import { config } from "./config.js";
import server from "./server.js";

const PORT = config.port;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
