//path:- server/models/designation.js
// creating schema for designation
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designationSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Designation = mongoose.model('Designation', designationSchema);
module.exports = Designation;