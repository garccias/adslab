const relatorioService = require('../services/relatorioService');

module.exports = {
  async pratosMaisPedidos(req, res) {
    try {
      const relatorio = await relatorioService.getPratosMaisPedidos();
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar relatório de pratos mais pedidos.' });
    }
  },

  async topClientesPorPedidos(req, res) {
    try {
      const relatorio = await relatorioService.getTop5ClientesPorPedidos();
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar relatório de top clientes por pedidos.' });
    }
  },

  async topClientesPorGasto(req, res) {
    try {
      const relatorio = await relatorioService.getTop5ClientesPorGasto();
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar relatório de top clientes por gasto.' });
    }
  }
};