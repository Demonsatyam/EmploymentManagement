require('dotenv').config({ path: `./env/.env.${process.env.NODE_ENV}` });
    const express = require('express');
    const app = express();
    const mongooseConnection = require('./db/mongooseConnection');
    const employeeRoutes = require('./routes/employeeRoutes');
    const errorHandler = require('./utils/errorHandler');
    
    app.use(express.json());
    app.use('/api/employees', employeeRoutes);
    app.use(errorHandler);
    
    const PORT = process.env.PORT || 8009;
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });