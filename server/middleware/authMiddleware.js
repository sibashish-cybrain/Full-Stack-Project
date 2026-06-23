const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
};

module.exports = authMiddleware;