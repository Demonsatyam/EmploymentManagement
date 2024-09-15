const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const validatePayload = require('../middlewares/validatePayload');
const { createEmployeeSchema, getAllEmployees, editEmployee, deleteEmployee } = require('../controllers/employeeControllerSchema');
const upload = require('../middlewares/upload'); // Import the middleware correctly

// Example route for adding an employee with an image upload
router.post('/add', upload.single('image'), validatePayload(createEmployeeSchema), employeeController.createEmployee);
router.post('/getall', validatePayload(getAllEmployees), employeeController.getAllEmployees);
router.put('/edit', upload.single('image'), employeeController.editEmployee);
router.delete('/delete', employeeController.deleteEmployee);

module.exports = router;
