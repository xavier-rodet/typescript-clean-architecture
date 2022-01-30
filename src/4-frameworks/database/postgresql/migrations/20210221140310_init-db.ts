// import { EGenre, EPlatform } from './../../../../1-entities/game';
import { EGenre, EPlatform } from '@entities/game';
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema.createTable('games', (table) => {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.double('price').notNullable();
      table.enum('genre', Object.values(EGenre)).notNullable();
      table.date('released_at').nullable();
      table.integer('read_count').notNullable();
      table.enum('platform', Object.values(EPlatform)).notNullable();
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    });
    console.log("table 'games' created");

    await knex.schema.createTable('players', (table) => {
      table.uuid('id').primary();
      table.string('name', 100).notNullable().unique();
      table.string('avatar', 100).nullable();
      table.double('account_balance').notNullable().defaultTo(0);
    });

    console.log("table 'players' created");

    await knex.schema.createTable('library', (table) => {
      table.uuid('game_id').notNullable();
      table.uuid('owner_id').notNullable();

      table.foreign('game_id').references('games.id');
      table.foreign('owner_id').references('players.id');

      table.primary(['game_id', 'owner_id']);
    });
    console.log("table 'library' created");

    await knex.schema.createTable('reviews', (table) => {
      table.uuid('id').primary();
      table.uuid('game_id').notNullable();
      table.uuid('reviewer_id').notNullable();
      table.text('message').nullable();
      table.float('rating').unsigned().notNullable();

      table.foreign('game_id').references('games.id');
      table.foreign('reviewer_id').references('players.id');

      table.unique(['game_id', 'reviewer_id']);
    });
    console.log("table 'reviews' created");

    await knex.schema.createTable('friendship', (table) => {
      table.uuid('friend_a_id').index();
      table.uuid('friend_b_id').index();

      table.foreign('friend_a_id').references('players.id');
      table.foreign('friend_b_id').references('players.id');

      table.unique(['friend_a_id', 'friend_b_id']);
    });

    console.log("table 'friendship' created");
  } catch (error) {
    console.error('failed to execute migration up', error);
  }
}

export async function down(knex: Knex): Promise<void> {
  try {
    await knex.schema.dropTable('friendship');
    console.log("table 'friendship' dropped");
    await knex.schema.dropTable('reviews');
    console.log("table 'reviews' dropped");
    await knex.schema.dropTable('library');
    console.log("table 'library' dropped");
    await knex.schema.dropTable('players');
    console.log("table 'players' dropped");
    await knex.schema.dropTable('games');
    console.log("table 'games' dropped");
  } catch (error) {
    console.error('failed to execute migration down', error);
  }
}
