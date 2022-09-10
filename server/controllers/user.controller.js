const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  mobile: Joi.string().regex(/^[1-9][0-9]/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
});

module.exports = {
  insert,
};

async function insert(user) {
  user = await userSchema.validateAsync(user, { abortEarly: false });
  user.password = bcrypt.hashSync(user.password, 10);
  return await new User(user).save();
}
