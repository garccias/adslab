const express = require('express');
const cors = require('cors');

const clienteRoutes = require('./routes/clienteRoutes');
const pratoRoutes = require('./routes/pratoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/pratos', pratoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/relatorios', relatorioRoutes);

module.exports = app;