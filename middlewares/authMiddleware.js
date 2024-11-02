const { admin } = require("../config/firebaseConfig");

// Middleware for authentication
const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Middleware for authorization (role-based)
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Ensure user has the role
    const userRole = req.user.role; // Adjust based on how role is defined in the token

    if (!userRole) {
      return res.status(403).json({ message: "Role not defined" });
    }

    if (allowedRoles.includes(userRole)) {
      return next(); // User is allowed
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = { authenticate, authorize };
