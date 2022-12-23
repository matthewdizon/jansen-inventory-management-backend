const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid JWT"); // The JWT is invalid
      return res.sendStatus(401);
    } else if (error instanceof jwt.TokenExpiredError) {
      console.error("JWT has expired"); // The JWT has expired
      return res.sendStatus(401);
    } else {
      console.error(error); // An unknown error occurred
      return res.sendStatus(401);
    }
  }
};

module.exports = authenticateToken;
