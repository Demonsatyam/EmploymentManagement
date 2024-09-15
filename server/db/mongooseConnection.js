const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.dbUri); // No need for useNewUrlParser or useUnifiedTopology
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
