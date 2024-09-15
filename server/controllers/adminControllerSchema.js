const Joi = require('joi');

// Define the login schema
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { loginSchema };
