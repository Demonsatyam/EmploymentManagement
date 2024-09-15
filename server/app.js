require('dotenv').config({ path: `./env/.env.${process.env.NODE_ENV}` });
const express = require('express');
const path = require('path');

const cors = require('cors');
const connectDB = require('./db/mongooseConnection');
const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./utils/errorHandler');
const { createAdminIfNotExists } = require('./services/adminService');

const app = express();

// handle cors
app.use(cors());


// Middleware
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
connectDB();

// Create admin if not exists on first server start
createAdminIfNotExists();


// Routes
app.use('/api/admin', adminRoutes);   
app.use('/api/employees', employeeRoutes);   

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8009;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});