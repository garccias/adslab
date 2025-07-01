exports.up = function(knex) {
  // Cria a tabela 'pratos'
  return knex.schema.createTable('pratos', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.text('descricao');
    table.decimal('preco', 14, 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  // Desfaz a criação, deletando a tabela 'pratos'
  return knex.schema.dropTable('pratos');
};