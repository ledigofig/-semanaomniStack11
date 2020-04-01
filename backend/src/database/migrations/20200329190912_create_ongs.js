
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table) {
        //criando tabelas do banco de dados sqlite
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('whattsapp').notNullable();
        table.string('cidade').notNullable();
        table.string('uf').notNullable();
      });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
