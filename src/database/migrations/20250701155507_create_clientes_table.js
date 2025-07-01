// arquivo da migration de clientes
exports.up = function(knex) {
  
  return knex.schema.createTable('clientes', (table) => {
    table.increments('id').primary(); // Chave primária auto-incremento
    table.string('nome').notNullable();
    table.string('cpf').notNullable().unique(); // CPF é obrigatório e único
    table.timestamps(true, true); // Cria os campos created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('clientes');
};