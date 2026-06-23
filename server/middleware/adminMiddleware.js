const adminMiddleware = (req, res, next) => {
  console.log("Logged in user:", req.user);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only."
    });
  }
  next();
};

module.exports = adminMiddleware;