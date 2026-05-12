// ─── Role Middleware ──────────────────────────────────
// This is a placeholder for the Auth module
// The Auth team will replace this with the full implementation

const roleGuard = (...roles) => {
  return (req, res, next) => {
    // ─── Check if user exists ─────────────────────────
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // ─── Check if user role is allowed ────────────────
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only ${roles.join(", ")} can access this route`,
      });
    }

    next();
  };
};

module.exports = roleGuard;