const TABLE_NAME = "users";
const COLUMN_NAMES = ["isActive", "shouldChangePassword"];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
  await knex.schema.alterTable(TABLE_NAME, function(table) {
    COLUMN_NAMES.forEach((column) => {
      table.boolean(column).defaultTo(false);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
  await knex.schema.alterTable(TABLE_NAME, function(table) {
    COLUMN_NAMES.forEach((column) => {
      table.dropColumn(column);
    });
  });
};

export { down, up };
