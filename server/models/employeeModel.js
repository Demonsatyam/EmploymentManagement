//path:- server/models/employeeModel.js
// creating a schema for employee
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: ['hr', 'manager', 'sales', 'developer'],
        required: true
    },
    gender: {
        type: String,
        enum: ['male','female'],
        required: true
    },
    course: { 
        type: String,
        enum: ['MCA', 'BCA', 'BSC', 'MSC'],
        required: true
    },
    imagepath: {
        type: String,
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;