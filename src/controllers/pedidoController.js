
const pedidoService = require('../services/pedidoService');

module.exports = {
  async create(req, res) {
    try {
      const pedido = await pedidoService.createPedido(req.body);

      return res.status(201).json({ 
        message: 'Pedido criado com sucesso!', 
        pedidoId: pedido.id 
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async listAll(req, res) {
    try {
      const pedidos = await pedidoService.getAllPedidos();
      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar pedidos.' });
    }
  },

  async getById(req, res) {
    try {
      const pedido = await pedidoService.getPedidoById(req.params.id);
      return res.json(pedido);
    } catch (error) {
      if (error.message.includes('encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao buscar pedido.' });
    }
  }
};