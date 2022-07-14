"use strict";
exports.__esModule = true;
exports.TopicPresenter = void 0;
var TopicPresenter = /** @class */ (function () {
    function TopicPresenter() {
    }
    TopicPresenter.prototype.present = function (params) {
        var _a;
        return {
            id: params.topic.id.value,
            authorId: params.topic.authorId.value,
            gameId: (_a = params.topic.gameId) === null || _a === void 0 ? void 0 : _a.value,
            title: params.topic.title,
            createdAt: params.topic.createdAt,
            updatedAt: params.topic.updatedAt
        };
    };
    return TopicPresenter;
}());
exports.TopicPresenter = TopicPresenter;
