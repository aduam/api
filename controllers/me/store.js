const Person = require('../../models/Person');

const getMe = async (id) => {
  let me = null;
  try {
    me = await Person.findOne({ where: { id }, raw: true, nest: true })
  } catch (error) {
    console.error(error)
    return { error: 'bad input' + error.message };
  }
  return { me };
};

module.exports = { getMe };