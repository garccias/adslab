const connection = require('../database/connection');

module.exports = {
  async createPedido({ cliente_id, pratos: pratosPedido }) {
    if (!cliente_id || !pratosPedido || pratosPedido.length === 0) {
      throw new Error('Dados do pedido inválidos. É necessário um cliente e pelo menos um prato.');
    }

    const novoPedidoId = await connection.transaction(async (trx) => {
      const pratoIds = pratosPedido.map(p => p.id);
      const pratosDoBanco = await trx('pratos').whereIn('id', pratoIds);

      let valor_total = 0;
      for (const prato of pratosPedido) {
        const pratoInfo = pratosDoBanco.find(p => p.id === prato.id);
        if (!pratoInfo) {
          throw new Error(`Prato com ID ${prato.id} não encontrado.`);
        }
        valor_total += pratoInfo.preco * prato.quantidade;
      }

      const [pedido_id] = await trx('pedidos').insert({
        cliente_id,
        valor_total
      });

      const itensDoPedido = pratosPedido.map(prato => ({
        pedido_id: pedido_id,
        prato_id: prato.id,
        quantidade: prato.quantidade
      }));

      await trx('pedidos_pratos').insert(itensDoPedido);

      return pedido_id;
    });

    return { id: novoPedidoId };
  },


  async getAllPedidos() {
    return connection('pedidos')
      .join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
      .select(
        'pedidos.id',
        'pedidos.valor_total',
        'pedidos.created_at',
        'clientes.nome as nome_cliente'
      );
  },

  async getPedidoById(id) {
    const pedido = await connection('pedidos')
      .join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
      .where('pedidos.id', id)
      .select(
        'pedidos.id',
        'pedidos.valor_total',
        'pedidos.created_at',
        'clientes.nome as nome_cliente'
      )
      .first();
      
    if (!pedido) {
      throw new Error('Pedido não encontrado.');
    }
    
    const itens = await connection('pedidos_pratos')
      .join('pratos', 'pratos.id', '=', 'pedidos_pratos.prato_id')
      .where('pedido_id', id)
      .select('pratos.nome', 'pedidos_pratos.quantidade', 'pratos.preco');

    return { ...pedido, itens }; 
  }
};