const express = require('express');

const clienteRoutes = require('./src/routes/clienteRoutes');
const pratoRoutes = require('./src/routes/pratoRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const relatorioRoutes = require('./src/routes/relatorioRoutes');

const app = express();
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/pratos', pratoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/relatorios', relatorioRoutes);

module.exports = app;