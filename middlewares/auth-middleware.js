const jwt = require("jsonwebtoken");
const User = require("../models/user-model");


const authmiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized HTTP: Token not provided" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid token format. Expected 'Bearer <token>'" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({email : isVerified.email}).select({password: 0,});
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized HTTP: Invalid token" });
  }
};

module.exports = authmiddleware;
