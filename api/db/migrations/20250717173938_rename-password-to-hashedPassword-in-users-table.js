const TABLE_NAME = "users";
const OLD_COLUMN_NAME = "password";
const NEW_COLUMN_NAME = "hashedPassword";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
  await knex.schema.alterTable(TABLE_NAME, function(table) {
    table.renameColumn(OLD_COLUMN_NAME, NEW_COLUMN_NAME);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
  await knex.schema.alterTable(TABLE_NAME, function(table) {
    table.renameColumn(NEW_COLUMN_NAME, OLD_COLUMN_NAME);
  });
};

export { down, up };
