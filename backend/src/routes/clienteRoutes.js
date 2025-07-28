// Em: backend/src/routes/clienteRoutes.js

const express = require('express');
const clienteController = require('../controllers/clienteController');

const routes = express.Router();

// --- ROTAS MAIS ESPECÍFICAS PRIMEIRO ---
// Rotas que lidam com a coleção inteira de clientes
routes.get('/', clienteController.listAll);
routes.post('/', clienteController.create);

// --- ROTAS MAIS GENÉRICAS (COM PARÂMETROS) DEPOIS ---
// Rotas que lidam com um cliente específico
routes.get('/:id', clienteController.getById); 
routes.put('/:id', clienteController.update); 
routes.delete('/:id', clienteController.delete);

module.exports = routes;