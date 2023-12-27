export function up(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('user_id').primary();
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password_hash').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export function down(knex) {
    return knex.schema.dropTable('users');
}
