const fs = require('fs');
const path = require('path');

const directories = [
  'config',
  'controllers',
  'models',
  'routes',
  'middlewares',
  'services',
  'utils',
  'db',
  'logs',
  'tests',
  'public',
  'scripts',
  'views',
  'env'
];

const files = {
  'config/default.js': `module.exports = { appName: 'Employee Management', port: 3000 };`,
  'config/development.js': `module.exports = { dbUri: 'mongodb://localhost:27017/dev_db' };`,
  'config/staging.js': `module.exports = { dbUri: 'mongodb://localhost:27017/staging_db' };`,
  'config/production.js': `module.exports = { dbUri: 'mongodb://localhost:27017/production_db' };`,
  'config/index.js': `
    const env = process.env.NODE_ENV || 'development';
    const config = require(\`./\${env}\`);
    module.exports = config;
  `,
  'controllers/employeeController.js': `// Employee controller logic here`,
  'models/employeeModel.js': `// Employee model schema here`,
  'routes/employeeRoutes.js': `// Employee routes here`,
  'middlewares/authMiddleware.js': `// Authentication middleware logic`,
  'services/employeeService.js': `// Employee business logic here`,
  'utils/errorHandler.js': `// Error handling logic here`,
  'db/mongooseConnection.js': `// Mongoose connection logic`,
  'env/.env.development': `PORT=3000\nDATABASE_URL=mongodb://localhost:27017/dev_db`,
  'env/.env.staging': `PORT=3000\nDATABASE_URL=mongodb://localhost:27017/staging_db`,
  'env/.env.production': `PORT=3000\nDATABASE_URL=mongodb://localhost:27017/production_db`,
  'app.js': `
    require('dotenv').config({ path: \`./env/.env.\${process.env.NODE_ENV}\` });
    const express = require('express');
    const app = express();
    const mongooseConnection = require('./db/mongooseConnection');
    const employeeRoutes = require('./routes/employeeRoutes');
    const errorHandler = require('./utils/errorHandler');
    
    app.use(express.json());
    app.use('/api/employees', employeeRoutes);
    app.use(errorHandler);
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(\`Server running in \${process.env.NODE_ENV} mode on port \${PORT}\`);
    });
  `,
  'package.json': `
    {
      "name": "employee-management-backend",
      "version": "1.0.0",
      "main": "app.js",
      "scripts": {
        "start": "NODE_ENV=production node app.js",
        "dev": "NODE_ENV=development nodemon app.js",
        "staging": "NODE_ENV=staging node app.js"
      },
      "dependencies": {
        "express": "^4.17.1",
        "dotenv": "^10.0.0",
        "mongoose": "^5.12.3"
      },
      "devDependencies": {
        "nodemon": "^2.0.7"
      }
    }
  `,
  'nodemon.json': `
    {
      "watch": ["app.js", "routes", "controllers", "models", "config"],
      "ext": "js",
      "exec": "node app.js"
    }
  `,
  '.gitignore': `
    node_modules
    logs
    .env
    .env.*
  `,
  'README.md': `# Employee Management System Backend\n\nThis is a backend system for managing employees using Node.js, Express, and Mongoose.`
};

const createDirectories = () => {
  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    }
  });
};

const createFiles = () => {
  Object.keys(files).forEach((file) => {
    const filePath = path.join(__dirname, file);
    fs.writeFileSync(filePath, files[file].trim());
    console.log(`File created: ${file}`);
  });
};

// Run the creation functions
createDirectories();
createFiles();

console.log('Project structure created successfully.');
