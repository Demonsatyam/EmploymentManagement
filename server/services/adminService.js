const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const passwordUtils = require('../utils/passwordUtils');

const createAdminIfNotExists = async () => {
    const admin = await Admin.findOne({ username: 'kumarSatyam' });
    if (!admin) {
        const randomPassword = passwordUtils.generateRandomPassword(6);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        
        const newAdmin = new Admin({
            username: 'kumarSatyam',
            password: hashedPassword
        });
        
        await newAdmin.save();
        
        const passwordFilePath = path.join(__dirname, '../', 'admin-password.txt');
        fs.writeFileSync(passwordFilePath, `Username: kumarSatyam\nPassword: ${randomPassword}`);
        
        console.log('Admin created with a random password. Password stored in admin-password.txt');
    }
};

module.exports = { createAdminIfNotExists };
