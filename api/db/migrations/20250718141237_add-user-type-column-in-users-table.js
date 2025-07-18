const TABLE_NAME = "users";
const COLUMN_NAME = "userType";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).comment("The type of user referenced in API constants").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
  await knex.schema.alterTable(TABLE_NAME, function(table) {
    table.dropColumn(COLUMN_NAME);
  });
};

export { down, up };
