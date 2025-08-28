import "dotenv/config";
/**
 * @param {string} numberAsString
 * @param {number} defaultIntNumber
 */
function _getNumber(numberAsString, defaultIntNumber) {
  const number = parseInt(numberAsString, 10);
  return isNaN(number) ? defaultIntNumber : number;
}

function _getLogForHumans() {
  const processOutputingToTerminal = process.stdout.isTTY;
  const forceJSONLogs = process.env.LOG_FOR_HUMANS === "false";
  return processOutputingToTerminal && !forceJSONLogs;
}

function toBoolean(value) {
  if (value === undefined) return false;
  return value.toLowerCase() === "true";
}

const configuration = (function() {
  const config = {
    port: _getNumber(process.env.PORT, 3000),
    environment: process.env.NODE_ENV || "development",
    logging: {
      enabled: toBoolean(process.env.LOG_ENABLED),
      logLevel: process.env.LOG_LEVEL || "info",
      logForHumans: _getLogForHumans(),
      logForHumansCompactFormat: process.env.LOG_FOR_HUMANS_FORMAT === "compact",
      debug: toBoolean(process.env.DEBUG_ENABLED),
    },
    users: {
      passwordHash: _getNumber(process.env.PASSWORD_HASH, 10),
    },
    jwt: {
      tokenSecret: process.env.TOKEN_SECRET,
      expirationTime: process.env.TOKEN_EXPIRATION,
    },
  };

  if (config.environment === "test") {
    config.port = 0;
    config.logging.enabled = false;
  }
  return config;
})();

export { configuration as config };
