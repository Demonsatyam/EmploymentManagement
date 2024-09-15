const Joi = require('joi');

const createEmployeeSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
    designation: Joi.string().required(),
    gender: Joi.string().required(),
    course: Joi.string().required(),
    // imagepath is being set in the controller after file upload, so no need to validate it here
});

const getAllEmployees = Joi.object({
    page: Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1).required(),
});

module.exports = {
    createEmployeeSchema,
    getAllEmployees
}
