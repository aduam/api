const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const getUser = async data => {
  const { email, password } = data;
  let user = null;
  let token = null;
  try {
    if (!email || !password) return 'incomplete data';
    user = await User.findOne({ where: { email }, raw: true, nest: true })
    if (!user) return 'user do not exist';
    hash = await bcrypt.compare(password, user.password);
    if (!hash) return 'error in user or password'
    token = await jwt.sign({
      data: {
        id: user.id,
        email,
      }
    }, process.env.SECRET_JWT, { expiresIn: '1h' });
  } catch (error) {
    console.error(error)
    return 'error';
  }
  return { user, token };
};

module.exports = { getUser }