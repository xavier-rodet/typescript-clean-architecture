"use strict";
exports.__esModule = true;
exports.topicController = void 0;
var topic_controller_1 = require("@domains/Community/Discussion/driving-adapters/api/controllers/topic-controller");
var create_topic_1 = require("../../../app/use-cases/create-topic");
var topic_presenter_1 = require("../presenters/topic-presenter");
exports.topicController = new topic_controller_1.TopicController(create_topic_1.createTopic, topic_presenter_1.topicPresenter);
