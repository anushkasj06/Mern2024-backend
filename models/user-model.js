const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails in the database
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;

  // Check if the password field is modified
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt);
    user.password = hash_password;
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Generate a JSON Web Token
userSchema.methods.generateToken = function () {
  const user = this;
  try {
    return jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" } // Token expiration period
    );
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed"); // Throw error for proper handling
  }
};

// Compare the password
userSchema.methods.isPasswordValid = async function (plainPassword) {
  const user = this;
  try {
    return await bcrypt.compare(plainPassword, user.password);
  } catch (error) {
    console.error("Error while comparing password:", error);
    throw error; // Rethrow the error for proper error handling
  }
};

const User = mongoose.model("User", userSchema); // Ensure the model name is "User" without extra spaces

module.exports = User;
