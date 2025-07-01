const express = require('express');
const clienteController = require('../controllers/clienteController');

const routes = express.Router();


routes.get('/:id', clienteController.getById); 
routes.put('/:id', clienteController.update); 
routes.delete('/:id', clienteController.delete);


routes.get('/', clienteController.listAll);
routes.post('/', clienteController.create);

module.exports = routes;