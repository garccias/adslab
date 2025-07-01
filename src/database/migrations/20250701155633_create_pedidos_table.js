exports.up = function(knex) {
  return knex.schema.createTable('pedidos', (table) => {
    table.increments('id').primary();

    table.integer('cliente_id')
      .references('id')
      .inTable('clientes')
      .notNullable();

    table.decimal('valor_total', 14, 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos');
};