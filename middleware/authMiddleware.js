import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT and authenticate user
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");

      // Find user and exclude password
      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        res.status(401);
        return next(new Error("Not authorized, user not found"));
      }

      if (req.user.status === "inactive") {
        res.status(403);
        return next(new Error("User account is inactive. Please contact support."));
      }

      next();
    } catch (error) {
      res.status(401);
      return next(new Error("Not authorized, token failed"));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, no token"));
  }
};

// Check specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(`User role '${req.user ? req.user.role : "Unknown"}' is not authorized to access this route`)
      );
    }
    next();
  };
};
