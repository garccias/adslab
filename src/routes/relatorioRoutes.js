
const express = require('express');
const relatorioController = require('../controllers/relatorioController');

const routes = express.Router();

routes.get('/pratos-mais-pedidos', relatorioController.pratosMaisPedidos);
routes.get('/top-clientes-pedidos', relatorioController.topClientesPorPedidos);
routes.get('/top-clientes-gasto', relatorioController.topClientesPorGasto);

module.exports = routes;