import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../models/userModels.js";

// Middleware function to verify JWT token from cookie
const authMiddleware = async (req, res, next) => {
  cookieParser()(req, res, async () => {
    const token = req.header("token");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Verify the token using the secret key
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select("-password"); // Set the decoded user information in the request object
      next(); // Move to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
};

export default authMiddleware;
