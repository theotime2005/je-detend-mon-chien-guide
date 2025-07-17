const TABLE_NAME = "users";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id").primary();
    table.string("email").unique().notNullable().comment("User email address");
    table.string("firstname").notNullable().comment("First name of user");
    table.string("lastname").notNullable().comment("Last name of user");
    table.string("password").notNullable().comment("User password hash");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
  await knex.schema.dropTable(TABLE_NAME);
};

export { down, up };
