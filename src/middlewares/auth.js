const dotenv = require("dotenv");
dotenv.config();

/* middleware to authenticate our API 
with API Key */

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res
      .status(401)
      .json({ error: "API KEY is required to perform operations" });
  }

  if (isValidApiKey(apiKey)) {
    next(); // Once api key validation succeeds we will proceed to route.
  } else {
    return res
      .status(403)
      .json({ error: "Oops, You have entered a wrong API KEY" });
  }
};

function isValidApiKey(apiKey) {
  const correctKey = process.env.VALID_API_KEY
    ? process.env.VALID_API_KEY
    : "SAMPLEAPIKEY";
  const outcome = correctKey == apiKey ? true : false;
  return outcome;
}

module.exports = {
  authMiddleware,
  isValidApiKey,
};
