const jwt = require("jsonwebtoken");

const authMiddlewareOptional = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch {}
  }
  next();
};

module.exports = authMiddlewareOptional;
