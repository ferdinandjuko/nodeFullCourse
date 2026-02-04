import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = {
    employees: JSON.parse(await fsPromises.readFile(path.join(__dirname, '..', 'model', 'employees.json'))),
    setEmployees: function (data) { this.employees = data; }
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployees.firstnane || !newEmployee.lastname) {
        res.status(400).json({ 'message': 'First and last names are required' });
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(find(emp => emp.id === parseInt(req.body.id)));
    if (!employee) {
        return res.status(400).json({ 'message': `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    res.json({ "id": req.params.id })
}

export { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }