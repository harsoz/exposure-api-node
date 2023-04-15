const {Router} = require('express');
const bodyParser = require('body-parser')
const router = new Router();
import dllController from '../controllers/dll.controller';

const fileParser = bodyParser.raw({ limit: '50mb', type: ['*/*'] });

router.get('/', dllController.getAll);
router.get('/:id', dllController.get);
router.get('/exec', dllController.execute);
router.post('/', fileParser, dllController.create);
// router.put('/:id', employeesController.updateEmployee);
// router.delete('/:id', employeesController.deleteEmployee);

export default router;