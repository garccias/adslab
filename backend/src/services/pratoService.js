const connection = require('../database/connection');

module.exports = {
  async createPrato({ nome, descricao, preco }) {
    if (!nome || nome.length < 3 || nome.length > 50) {
      throw new Error('O nome do prato deve ter entre 3 e 50 caracteres.');
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(nome)) {
      throw new Error('O nome do prato deve conter apenas letras e espaços.');
    }
    if (!preco || preco <= 0) {
      throw new Error('O preço do prato deve ser um valor positivo.');
    }
    const [id] = await connection('pratos').insert({ nome, descricao, preco })
    return { id };
  },

  async getAllPratos() {
    return connection('pratos').select('*');
  },

  async getPratoById(id) {
    const prato = await connection('pratos').where('id', id).first();
    if (!prato) {
      throw new Error('Prato não encontrado.');
    }
    return prato;
  },

  async updatePrato(id, { nome, descricao, preco }) {
    if (nome) {
      if (nome.length < 3 || nome.length > 50) {
        throw new Error('O nome do prato deve ter entre 3 e 50 caracteres.');
      }
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(nome)) {
        throw new Error('O nome do prato deve conter apenas letras e espaços.');
      }
    }

    const [pratoAtualizado] = await connection('pratos').where('id', id).update({ nome, descricao, preco }).returning('*');
    if (!pratoAtualizado) {
      throw new Error('Prato não encontrado.');
    }
    return pratoAtualizado;
  },

  async deletePrato(id) {
    const result = await connection('pratos').where('id', id).delete();
    if (result === 0) {
      throw new Error('Prato não encontrado.');
    }
  }
};