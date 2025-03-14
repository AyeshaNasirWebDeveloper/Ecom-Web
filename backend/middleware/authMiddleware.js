import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignIn = async (req,res,next) => {
  try {
    // Encrypt
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // Decrypt
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error:", error);
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    // Find user by id 
    const user = await userModel.findById(req.user._id);
    // validation for admin
    if (user.role !== 1)
      return res.status(401).json({
        success: false,
        message: "UnAuthorized Access",
      });
    else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
        success: false,
        message: "Error in Admin middleware"
    })
  }
};


// export const isAdmin = (req, res, next) => {
//     // Check if user exists
//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//     }
//     // Check if user has the 'admin' role
//     if (req.user.role === 1) {
//       next(); // Allow access
//     } else {
//       return res.status(403).json({ message: 'Forbidden: User is not an admin' });
//     }
//   };