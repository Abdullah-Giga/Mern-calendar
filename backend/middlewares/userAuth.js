const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

// Checking if the user accessing a specific route is logged in or not
const requireAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id).select("-password");
    next();
    } catch (error) {
        res.status(401);
       console.log(error)
    }
  } 
  if (!token) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
};



module.exports = requireAuth;
