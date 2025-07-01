
const express = require('express');
const pratoController = require('../controllers/pratoController');

const routes = express.Router();

routes.post('/', pratoController.create);
routes.get('/', pratoController.listAll);
routes.get('/:id', pratoController.getById);
routes.put('/:id', pratoController.update);
routes.delete('/:id', pratoController.delete);

module.exports = routes;