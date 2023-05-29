const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorize" });
    }

    /**
     * split return array and [1] means index one
     */
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorize" });
    }
    /**
     * pass mutable value
     * req.user = user
     */
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = authenticate;
