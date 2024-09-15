const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // If you're using JWT for authentication
const { loginSchema } = require('./adminControllerSchema');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Create JWT token (if using JWT)
        const accesstoken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Create refresh token
        const refreshToken = jwt.sign({ id: admin._id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({ 
            message: 'Login successful', 
            access_token: accesstoken,
            refresh_token: refreshToken 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { login };
