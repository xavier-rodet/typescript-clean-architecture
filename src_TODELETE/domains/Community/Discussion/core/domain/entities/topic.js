"use strict";
exports.__esModule = true;
exports.Topic = void 0;
var errors_1 = require("@domains/SharedKernel/core/domain/errors");
var value_objects_1 = require("@domains/SharedKernel/core/domain/value-objects");
var utils_1 = require("@ts-extension/utils");
var Topic = /** @class */ (function () {
    function Topic(props) {
        var _a, _b, _c;
        this.id = (_a = props.id) !== null && _a !== void 0 ? _a : new value_objects_1.Uid(utils_1.UidUtil.generate());
        this.gameId = props.gameId;
        this.authorId = props.authorId;
        this.title = props.title;
        this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
        this.updatedAt = (_c = props.updatedAt) !== null && _c !== void 0 ? _c : new Date();
        this.validate();
    }
    Topic.prototype.validate = function () {
        if (this.title.length >= 50) {
            throw new errors_1.ValidationError('Topic title is too long');
        }
    };
    return Topic;
}());
exports.Topic = Topic;
