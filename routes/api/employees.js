import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// namespace import (keeps employeesController.xxx usage)
import * as employeesController from '../../controllers/employeesController.js';
import ROLES_LIST from '../../config/roleList.js';
import verifyRoles from '../../middleware/verifyRoles.js';

const router = express.Router();

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

export default router;