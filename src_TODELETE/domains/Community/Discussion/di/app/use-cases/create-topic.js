"use strict";
exports.__esModule = true;
exports.createTopic = void 0;
var create_topic_1 = require("@domains/Community/Discussion/core/app/use-cases/create-topic");
var authorization_1 = require("@shared-kernel/di/driven-adapters/authorization");
var topic_repository_1 = require("../../driven-adapters/repositories/topic-repository");
exports.createTopic = new create_topic_1.CreateTopic(authorization_1.authorization, topic_repository_1.topicRepository);
