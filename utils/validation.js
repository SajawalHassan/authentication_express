const Joi = require("@hapi/joi");

module.exports.validateRegistration = function (data) {
  // Creating schema for registration
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports.validateLogin = function (data) {
  // Creating schema for login
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};
