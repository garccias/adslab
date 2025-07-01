
const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const routes = express.Router();

routes.post('/', pedidoController.create);
routes.get('/', pedidoController.listAll);
routes.get('/:id', pedidoController.getById);

module.exports = routes;