import "dotenv/config";

/**
 * @param {string} numberAsString
 * @param {number} defaultIntNumber
 */
function _getNumber(numberAsString, defaultIntNumber) {
  const number = parseInt(numberAsString, 10);
  return isNaN(number) ? defaultIntNumber : number;
}

const configuration = (function() {
  const config = {
    port: _getNumber(process.env.PORT, 3000),
    environment: process.env.NODE_ENV || "development",

  };

  if (config.environment === "test") {
    config.port = 0;
  }
  return config;
})();

export { configuration as config };
