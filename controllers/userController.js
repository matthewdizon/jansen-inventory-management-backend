const User = require("../models/usersModel");

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

    try {
      const user = await User.create({
        email: email,
        password: password,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    // user.save(function (err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.json({ token: tokenForUser(user) });
    // });
  });
};

module.exports = {
  createUser,
};
