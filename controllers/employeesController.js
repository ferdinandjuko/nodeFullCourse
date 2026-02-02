import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = {};

data.employees = JSON.parse(await fsPromises.readFile(path.join(__dirname, '..', 'model', 'employees.json')));

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const updateEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const deleteEmployee = (req, res) => {
    res.json({ "id": req.body.id })
}

const getEmployee = (req, res) => {
    res.json({ "id": req.params.id })
}

export { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }