import { EGenre, EPlatform } from '@entities/game'
import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('friendship').del()
  await knex('reviews').del()
  await knex('library').del()
  await knex('players').del()
  await knex('games').del()

  // Inserts seed entries
  await knex('games').insert([
    {
      id: '4ba76bf7-a40e-4f8b-b3fe-7e03e317b0b6',
      name: 'counter-strike',
      price: 4.99,
      genre: EGenre.FPS,
      released_at: '1999-03-16T08:43:44.148Z',
      readCount: 100,
      platform: EPlatform.PC,
      created_at: '2021-03-16T08:45:45.370Z',
      updated_at: '2021-03-16T08:58:41.633Z',
    },

    {
      id: '9ca20357-b639-44a8-bee5-0faaf0a2c951',
      name: 'counter-strike: source',
      price: 9.99,
      genre: EGenre.FPS,
      released_at: '2001-03-16T08:43:44.148Z',
      readCount: 0,
      platform: EPlatform.PC,
      created_at: '2021-03-16T08:51:04.230Z',
      updated_at: '2021-03-16T08:51:04.230Z',
    },

    {
      id: 'e62bb1db-3cb3-4682-9b60-ee83b0b191ee',
      name: 'counter-strike: global offensive',
      price: 14.99,
      genre: EGenre.FPS,
      released_at: '2015-03-16T08:43:44.148Z',
      readCount: 1000,
      platform: EPlatform.PC,
      created_at: '2021-03-16T08:51:41.076Z',
      updated_at: '2021-03-16T08:51:41.076Z',
    },

    {
      id: '741433ba-d179-417a-a57f-b4f5d770d3e7',
      name: 'Syphon Filter',
      price: 8.5,
      genre: EGenre.TPS,
      released_at: '1997-03-16T09:39:07.860Z',
      readCount: 10,
      platform: EPlatform.PLAYSTATION,
      created_at: '2021-03-16T09:40:05.032Z',
      updated_at: '2021-03-16T09:40:05.032Z',
    },
  ])

  await knex('players').insert([
    {
      id: '0eb5c6b6-8f65-4f55-a71f-c9c7dbd93c95',
      name: 'logan',
      avatar: null,
    },
    {
      id: '13a02b7c-d2ba-44ec-a65d-b5c3e666b2b9',
      name: 'snail',
      avatar: null,
    },
    {
      id: '7d22d1d9-2c6c-4413-b4c8-0faef871f0d5',
      name: 'luckso',
      avatar: null,
      account_balance: 75,
    },
  ])

  await knex('library').insert([
    {
      game_id: '4ba76bf7-a40e-4f8b-b3fe-7e03e317b0b6',
      owner_id: '7d22d1d9-2c6c-4413-b4c8-0faef871f0d5',
    },
    {
      game_id: 'e62bb1db-3cb3-4682-9b60-ee83b0b191ee',
      owner_id: '7d22d1d9-2c6c-4413-b4c8-0faef871f0d5',
    },
    {
      game_id: '741433ba-d179-417a-a57f-b4f5d770d3e7',
      owner_id: '0eb5c6b6-8f65-4f55-a71f-c9c7dbd93c95',
    },
  ])

  await knex('reviews').insert([
    {
      id: '78c39fb7-1a72-4474-a31e-8e5270d6aa94',
      game_id: 'e62bb1db-3cb3-4682-9b60-ee83b0b191ee',
      reviewer_id: '7d22d1d9-2c6c-4413-b4c8-0faef871f0d5',
      message: 'This is just the best game ever',
      rating: 10,
    },

    {
      id: 'fc260683-19bd-4b18-ab5a-d2c8b906f0cf',
      game_id: '741433ba-d179-417a-a57f-b4f5d770d3e7',
      reviewer_id: '0eb5c6b6-8f65-4f55-a71f-c9c7dbd93c95',
      message: 'This is the game I choose my nickname from!',
      rating: 8,
    },
  ])
}
