const connection = require('../database/connection');

module.exports = {
  async getPratosMaisPedidos() {
    return connection('pedidos_pratos')
      .join('pratos', 'pratos.id', '=', 'pedidos_pratos.prato_id')
      .select('pratos.nome')
      .sum('pedidos_pratos.quantidade as quantidade_total_pedida')
      .groupBy('pratos.nome')
      .orderBy('quantidade_total_pedida', 'desc');
  },

  async getTop5ClientesPorPedidos() {
    return connection('pedidos')
      .join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
      .select('clientes.nome')
      .count('pedidos.id as total_de_pedidos')
      .groupBy('clientes.nome')
      .orderBy('total_de_pedidos', 'desc')
      .limit(5);
  },

  async getTop5ClientesPorGasto() {
    return connection('pedidos')
      .join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
      .select('clientes.nome')
      .sum('pedidos.valor_total as total_gasto')
      .groupBy('clientes.nome')
      .orderBy('total_gasto', 'desc')
      .limit(5);
  }
};