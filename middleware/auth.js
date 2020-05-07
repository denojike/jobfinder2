const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  // const token = req.header('x-auth-token');
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  //Verify
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.employer = decoded.employer;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
};
