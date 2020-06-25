const response = require('../../utils/response');
const { getMe } = require('./store');

const me = async (req, res) => {
  const { userContent } = req;
  const user = await getMe(userContent.id);
  if (!user.error) {
    response(res, 200, 'success', user)
  }
  response(res, 400, 'error input', user);
};

module.exports = { me };