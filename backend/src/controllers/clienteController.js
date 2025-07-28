const clienteService = require('../services/clienteService');

module.exports = {
  async create(req, res) {
  try {
    const clienteCriado = await clienteService.createCliente(req.body);

    return res.status(201).json({ 
      message: 'Cliente criado com sucesso!', 
      clienteId: clienteCriado.id 
    });

  } catch (error) {
  if (error.message.includes('CPF')) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Erro interno do servidor.' });
}
},

  async listAll(req, res) {
    try {
      const clientes = await clienteService.getAllClientes();
      return res.json(clientes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar clientes.' });
    }
  },

  async getById(req, res) {
    try {
      const cliente = await clienteService.getClienteById(req.params.id);
      return res.json(cliente);
    } catch (error) {
      if (error.message.includes('encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao buscar cliente.' });
    }
  },

  async update(req, res) {
    try {
      const cliente = await clienteService.updateCliente(req.params.id, req.body);
      return res.json({ message: 'Cliente atualizado com sucesso!', cliente });
    } catch (error) {
      if (error.message.includes('encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao atualizar cliente.' });
    }
  },

  async delete(req, res) {
    try {
      await clienteService.deleteCliente(req.params.id);
      return res.status(204).send(); 
    } catch (error) {
      if (error.message.includes('encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao remover cliente.' });
    }
  }
};