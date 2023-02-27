const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jose = require("jose");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Email and password must be provided" });
  }

  User.findOne({ email: email }, async function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is already in use..." });
    }

    const user = new User({
      email: email,
      password: password,
    });

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
  const payload = {
    user: user?.email, // The user's email
  };
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const accessToken = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime("3d")
        .sign(secret);
      res.json({ accessToken: accessToken });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
};

const identifyUser = async (req, res) => {
  // Get the access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

  // Verify the access token using the secret that was used to sign it
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    const email = payload.user;
    res.send({ email: email });
  } catch (error) {
    console.error(error); // An unknown error occurred
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = {
  createUser,
  loginUser,
  identifyUser,
};
