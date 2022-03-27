const jwt = require('jsonwebtoken');

const jwtConfig = { expiresIn: '99d' };

const SECRET = process.env.JWT_SECRET;

module.exports = (token = {}) => jwt.sign({ token }, SECRET, jwtConfig);
