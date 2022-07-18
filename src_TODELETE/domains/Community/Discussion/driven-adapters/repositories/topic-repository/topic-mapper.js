"use strict";
exports.__esModule = true;
exports.TopicMapper = void 0;
var entities_1 = require("@domains/Community/Discussion/core/domain/entities");
var value_objects_1 = require("@shared-kernel/core/domain/value-objects");
var TopicMapper = /** @class */ (function () {
    function TopicMapper() {
    }
    TopicMapper.fromDomain = function (topic) {
        var _a;
        return {
            id: topic.id.value,
            author_id: topic.authorId.value,
            game_id: (_a = topic.gameId) === null || _a === void 0 ? void 0 : _a.value,
            title: topic.title,
            created_at: topic.createdAt.toString(),
            updated_at: topic.updatedAt.toString()
        };
    };
    TopicMapper.toDomain = function (rawTopic) {
        return new entities_1.Topic({
            id: new value_objects_1.Uid(rawTopic.id),
            authorId: new value_objects_1.Uid(rawTopic.author_id),
            gameId: rawTopic.game_id ? new value_objects_1.Uid(rawTopic.game_id) : undefined,
            title: rawTopic.title,
            createdAt: new Date(rawTopic.created_at),
            updatedAt: new Date(rawTopic.updated_at)
        });
    };
    return TopicMapper;
}());
exports.TopicMapper = TopicMapper;
