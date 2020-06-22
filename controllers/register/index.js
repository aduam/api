const response = require('../../utils/response');
const { createUser } = require('./store');

const register = async (req, res) => {
  const { body, files } = req;
  const create = await createUser(body, files);
  if (!create.error) {
    response(res, 200, 'success', create)
  }
  response(res, 400, 'error input', create);
};

module.exports = register;
