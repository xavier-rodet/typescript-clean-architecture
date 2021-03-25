import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema.createTable("games", (table) => {
      table.uuid("id").primary();
      table.jsonb("game").notNullable();
      table
        .enum("platform", ["pc", "playstation", "xbox"])
        .defaultTo("pc")
        .notNullable();
      table.dateTime("createdAt").notNullable();
      table.dateTime("updatedAt").notNullable();
    });
    console.log("table 'games' created");

    await knex.schema.createTable("players", (table) => {
      table.uuid("id").primary();
      table.string("name", 100).notNullable().unique();
      table.string("avatar", 100).nullable();
    });

    console.log("table 'players' created");

    await knex.schema.createTable("library", (table) => {
      table.uuid("gameId").notNullable();
      table.uuid("ownerId").notNullable();

      table.foreign("gameId").references("games.id");
      table.foreign("ownerId").references("players.id");

      table.primary(["gameId", "ownerId"]);
    });
    console.log("table 'library' created");

    await knex.schema.createTable("reviews", (table) => {
      table.uuid("id").primary();
      table.uuid("gameId").notNullable();
      table.uuid("reviewerId").notNullable();
      table.text("message").nullable();
      table.float("rating").unsigned().notNullable();

      table.foreign("gameId").references("games.id");
      table.foreign("reviewerId").references("players.id");

      table.unique(["gameId", "reviewerId"]);
    });
    console.log("table 'reviews' created");

    await knex.schema.createTable("friendship", (table) => {
      table.uuid("playerFirstId").index();
      table.uuid("playerSecondId").index();

      table.foreign("playerFirstId").references("players.id");
      table.foreign("playerSecondId").references("players.id");

      table.unique(["playerFirstId", "playerSecondId"]);
    });

    console.log("table 'friendship' created");
  } catch (error) {
    console.error("failed to execute migration up", error);
  }
}

export async function down(knex: Knex): Promise<void> {
  try {
    await knex.schema.dropTable("friendship");
    console.log("table 'friendship' dropped");
    await knex.schema.dropTable("reviews");
    console.log("table 'reviews' dropped");
    await knex.schema.dropTable("library");
    console.log("table 'library' dropped");
    await knex.schema.dropTable("players");
    console.log("table 'players' dropped");
    await knex.schema.dropTable("games");
    console.log("table 'games' dropped");
  } catch (error) {
    console.error("failed to execute migration down", error);
  }
}
