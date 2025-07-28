exports.up = function(knex) {
  return knex.schema.createTable('pedidos_pratos', (table) => {
    table.increments('id').primary();

    table.integer('pedido_id')
      .references('id')
      .inTable('pedidos')
      .notNullable()
      .onDelete('CASCADE'); // Se um pedido for deletado, os itens somem juntos

    table.integer('prato_id')
      .references('id')
      .inTable('pratos')
      .notNullable();

    table.integer('quantidade').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos_pratos');
};