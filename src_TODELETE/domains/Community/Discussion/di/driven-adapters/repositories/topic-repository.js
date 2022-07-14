"use strict";
exports.__esModule = true;
exports.topicRepository = void 0;
var topic_repository_1 = require("@domains/Community/Discussion/driven-adapters/repositories/topic-repository");
var knex_1 = require("../../infra/knex");
exports.topicRepository = new topic_repository_1.TopicRepository(knex_1.knex);
