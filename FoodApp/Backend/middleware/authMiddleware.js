const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user details to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

const authorizeUser = (req, res, next) => {
  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only authenticated users can access this.' });
  }
  next();
};

module.exports = { authenticateToken, authorizeAdmin, authorizeUser };
