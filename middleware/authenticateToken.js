const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  req.userData = decoded;

  next();
};

module.exports = authenticateToken;
