const jwt = require('jsonwebtoken');
const response = require('../utils/response')

const auth = (req, res, next) => {
  const token = req.header('authorization');
  if (!token) { response(res, 401, 'success', 'access denied'); }
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    req.userContent = {
      id: payload.data.id,
      email: payload.data.email,
    };
  } catch (error) {
    console.error('error', error)
    response(res, 401, 'failure', 'access denied in jwt');
  }
  next();
};

module.exports = auth;