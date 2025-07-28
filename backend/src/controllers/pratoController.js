const pratoService = require('../services/pratoService');

module.exports = {
  async create(req, res) {
    try {
      const pratoCriado = await pratoService.createPrato(req.body);
      return res.status(201).json({ 
        message: 'Prato criado com sucesso!', 
        pratoId: pratoCriado.id 
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async listAll(req, res) {
    try {
      const pratos = await pratoService.getAllPratos();
      return res.json(pratos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar pratos.' });
    }
  },

  async getById(req, res) {
    try {
      const prato = await pratoService.getPratoById(req.params.id);
      return res.json(prato);
    } catch (error) {
      // Se o service lançar um erro de 'não encontrado', retornamos 404
      if (error.message.includes('encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao buscar prato.' });
    }
  },

  async update(req, res) {
    try {
      const prato = await pratoService.updatePrato(req.params.id, req.body);
      return res.json({ message: 'Prato atualizado com sucesso!', prato });
    } catch (error) {
      if (error.message.includes('encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await pratoService.deletePrato(req.params.id);
      return res.status(204).send(); 
    } catch (error) {
      if (error.message.includes('encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao remover prato.' });
    }
  }
};