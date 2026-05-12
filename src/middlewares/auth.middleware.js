// ─── Auth Middleware Placeholder ──────────────────────
// This will be replaced by the Auth team's implementation

const protect = (req, res, next) => {
  // ─── Attach a mock admin user for testing ─────────
  req.user = {
    _id: "507f1f77bcf86cd799439011",
    fullName: "Test Admin",
    email: "admin@hospital.com",
    role: "admin"
  };
  
  next();
};

module.exports = protect;