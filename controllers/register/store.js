const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const uuid = require('uuid4');
const Person = require('../../models/Person');
const User = require('../../models/User');
const saltRounds = 10;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
})

const uploadImage = (params) => {
  return s3.upload(params).promise();
}

const createUser = async (data, files) => {
  const { names, surnames, email, phone, address, password } = data;
  let person = null;
  let user = null;
  let image = null;
  try {
    if (!names || !surnames || !email || !phone || !address || !password) return { error: 'bad input' };
    person = await Person.findOne({ where: { email }, raw: true, nest: true })
    if (person) return { error: 'user exist' };
    const hash = await bcrypt.hash(password, saltRounds);
    if (files) {
      const params = {
        Bucket: process.env.BUCKET,
        Key: uuid() + files.file.name,
        Body: files.file.data,
        ACL: 'public-read'
      };
      image = await uploadImage(params);
      person = await Person.create({ names, surnames, email, phone, address, active: true, image: image.Location }, { fields: ['names', 'surnames', 'email', 'phone', 'address', 'active', 'image'] });
      if (person) {
        user = await User.create({ id: person.id, email, password: hash });
      }
    } else {
      person = await Person.create({ names, surnames, email, phone, address, active: true }, { fields: ['names', 'surnames', 'email', 'phone', 'address', 'active'] });
      if (person) {
        user = await User.create({ id: person.id, email, password: hash });
      }
    }
  } catch (error) {
    console.error(error)
    return { error: 'bad input' };
  }
  return { person, email: user.email };
};

module.exports = { createUser }