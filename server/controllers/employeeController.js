//required modules
const Employee = require('../models/employeeModel');

//creating a new employee
// to uplaod image we need to use multer and we will be storing this in local directory in the name of the emploeey id
// we will be using the fs module to store the image
const createEmployee = async (req, res) => {
    try{
        // everything will be coming in the form of form data
        // so we will be extracting the data from the form data
        let { name, email, phone, designation, gender, course } = req.body;
        designation = designation.toLowerCase();
        
        // checking if the email already exists with the same email or phone number
        const emailExists = await Employee.exists({ email });
        if(emailExists){
            return res.status(400).json({ message: 'Email already exists' });
        }
        const phoneExists = await Employee.exists({ phone });
        if(phoneExists){
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        const image = req.file;
        // creating a new employee
        const newEmployee = new Employee({
            name, email, phone, designation, gender, course, imagepath: image.path
        });
        // saving the employee
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllEmployees = async (req, res) => {
    try{
        const { page, limit } = req.query;
        // setting the default page and limit
        const pageNumber = page ? parseInt(page) : 1;
        const limitNumber = limit ? parseInt(limit) : 10;
        let totalpages = 0;
        // getting the total number of employees
        const totalEmployees = await Employee.countDocuments();
        // calculating the total pages
        if(totalEmployees % limitNumber === 0){
            totalpages = totalEmployees / limitNumber;
        } else {
            totalpages = parseInt(totalEmployees / limitNumber) + 1;
        }
        // getting the employees
        const employees = await Employee.find().skip((pageNumber - 1) * limitNumber).limit(limitNumber);
        res.status(200).json({ employees, totalpages });
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const editEmployee = async (req, res) => {
    try{
        const { id, name, email, phone, designation, gender, course } = req.body;
        const image = req.file;
        const employee = await Employee.findById(id);
        if(!employee){
            return res.status(404).json({ message: 'Employee not found' });
        }
        employee.name = name;
        employee.email = email;
        employee.phone = phone;
        employee.designation = designation;
        employee.gender = gender;
        employee.course = course;
        if(image){
            employee.imagepath = image.path;
        }
        await employee.save();
        res.status(200).json({ message: 'Employee updated successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteEmployee = async (req, res) => {
    try{
        const { id } = req.body;
        const employee = await Employee.findByIdAndDelete(id);
        if(!employee){
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


module.exports = { createEmployee, getAllEmployees, editEmployee, deleteEmployee };