const express = require('express');
const router = express.Router();

const emplectrl = require('../controllers/empleados');

router.get('/', emplectrl.ObtenerEmpleados);
router.post('/', emplectrl.AgregarEmpleados);
router.get('/:id', emplectrl.ObtenerEmpleado);
router.put('/:id', emplectrl.EditarEmpleado);
router.delete('/:id',emplectrl.BorrarEmpleado);

module.exports = router;