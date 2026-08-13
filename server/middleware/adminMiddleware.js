// Must be used AFTER the `protect` middleware, since it relies on req.user
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: admin role required" });
};

module.exports = { adminOnly };
