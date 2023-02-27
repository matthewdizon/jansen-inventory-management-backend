const jose = require("jose");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

  if (token == null) return res.sendStatus(401);

  try {
    const { payload } = await jose.jwtVerify(token, secret);
    req.userData = payload;
    next();
  } catch (error) {
    console.error(error); // An unknown error occurred
    return res.sendStatus(401);
  }
};

module.exports = authenticateToken;
