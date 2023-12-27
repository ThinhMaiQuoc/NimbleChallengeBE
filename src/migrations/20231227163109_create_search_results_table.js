export function up(knex) {
    return knex.schema.createTable('search_results', function (table) {
        table.increments('result_id').primary();
        table.integer('keyword_id').unsigned().notNullable();
        table.foreign('keyword_id').references('keyword_id').inTable('keywords');
        table.integer('adwords_count').defaultTo(0);
        table.integer('link_count').defaultTo(0);
        table.string('total_results').nullable();
        table.text('html_code').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export function down(knex) {
    return knex.schema.dropTable('search_results');
}
