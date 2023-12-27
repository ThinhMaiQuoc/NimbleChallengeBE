export function up(knex) {
    return knex.schema.createTable('keywords', function (table) {
        table.increments('keyword_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('user_id').inTable('users');
        table.string('keyword').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export function down(knex) {
    return knex.schema.dropTable('keywords');
}
