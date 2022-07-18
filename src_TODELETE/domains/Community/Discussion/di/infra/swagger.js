"use strict";
exports.__esModule = true;
exports.swagger = exports.iocContainer = void 0;
var topic_controller_1 = require("../../driving-adapters/api/controllers/topic-controller");
var topic_controller_2 = require("../driving-adapters/api/controllers/topic-controller");
var swagger_1 = require("../../infra/swagger");
var path_1 = require("path");
var correlator_1 = require("@shared-kernel/di/driven-adapters/correlator");
// ----------------------------------------------------------------------------------------------------------
/******************** Swagger ********************/
var controllers = {};
controllers[topic_controller_1.TopicController.name] = topic_controller_2.topicController;
// This will be called by TSOA to get controllers instances!
// See tsoa.json & https://tsoa-community.github.io/docs/di.html#ioc-module
var TsoaContainer = /** @class */ (function () {
    function TsoaContainer(iocContainer) {
        this.iocContainer = iocContainer;
    }
    TsoaContainer.prototype.get = function (controller) {
        return this.iocContainer[controller.name];
    };
    return TsoaContainer;
}());
exports.iocContainer = new TsoaContainer(controllers);
var swaggerConfig = {
    port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8080,
    env: process.env.ENV || '',
    definitionsPath: (0, path_1.resolve)(__dirname, '../../dist/swagger.json'),
    corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN || ''
};
exports.swagger = new swagger_1.Swagger(correlator_1.correlator, swaggerConfig);
/******************** Swagger  ********************/
