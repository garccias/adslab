
const connection = require('../database/connection');
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
  async createCliente({ nome, cpf_cliente }) {
    // 1. Validação de formato
    if (!cpf.isValid(cpf_cliente)) {
      throw new Error('CPF inválido.');
    }
    
    const formattedCpf = cpf.strip(cpf_cliente);

    try {
      const [id] = await connection('clientes').insert({
        nome,
        cpf: formattedCpf,
      });

      return { id };

    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Este CPF já está cadastrado.');
      }
      throw error;
    }
  },

  async getAllClientes() {
    return connection('clientes').select('*');
  },

  async getClienteById(id) {
    const cliente = await connection('clientes').where('id', id).first();
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }
    return cliente;
  },

  async updateCliente(id, { nome }) {
    const result = await connection('clientes')
      .where('id', id)
      .update({ nome });
    
    if (result === 0) {
      throw new Error('Cliente não encontrado para atualizar.');
    }

    return this.getClienteById(id);
  },

  async deleteCliente(id) {
    const result = await connection('clientes').where('id', id).delete();
    
    if (result === 0) {
      throw new Error('Cliente não encontrado para deletar.');
    }

    return { message: 'Cliente removido com sucesso.' };
  }
};