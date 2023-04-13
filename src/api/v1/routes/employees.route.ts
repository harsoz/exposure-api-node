const {Router} = require('express');
const router = new Router();
const employeesController = require('../controllers/employees.controller');

router.get('/', employeesController.getEmployees);
// router.get('/:id', employeesController.getEmployee);
// router.post('/', employeesController.createEmployee);
// router.put('/:id', employeesController.updateEmployee);
// router.delete('/:id', employeesController.deleteEmployee);

module.exports = router;