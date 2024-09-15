// path:- server/models/course.js
// creating a schema for course
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagepath: {
        type: String,
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;