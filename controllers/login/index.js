const response = require('../../utils/response');
const { getUser } = require('./store');

const login = async (req, res) => {
  const user = await getUser(req.body);
  if (user.user) {
    response(res, 200, 'success', user)
  }
  response(res, 400, 'error input', user);
};

module.exports = login;
