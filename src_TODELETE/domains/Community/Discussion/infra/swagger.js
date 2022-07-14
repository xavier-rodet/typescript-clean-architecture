"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Swagger = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var swagger_ui_express_1 = require("swagger-ui-express");
var tsoa_1 = require("tsoa");
var routes_1 = require("../dist/routes");
var constants_1 = require("@ts-extension/constants");
var errors_1 = require("@domains/SharedKernel/core/domain/errors");
var Swagger = /** @class */ (function () {
    function Swagger(correlator, config) {
        this.correlator = correlator;
        this.config = config;
        this.express = (0, express_1["default"])();
        this.useBodyParser();
        this.useCorrelation();
        this.useCors(this.config.corsAllowOrigin);
        this.registerApiRoutes();
        this.registerApiDocs(this.config.definitionsPath);
        this.catchErrors();
        this.catchAll();
    }
    Swagger.prototype.start = function () {
        var _this = this;
        this.express.listen(this.config.port, function () {
            console.info('HTTP Server started:');
            console.info("-> API is now available on http://localhost:".concat(_this.config.port, "/"));
            console.info("-> API Documentation is now available on http://localhost:".concat(_this.config.port, "/docs/#/"));
            console.info("-> API Specification definitions is now available on http://localhost:".concat(_this.config.port, "/swagger.json"));
        });
    };
    Swagger.prototype.useBodyParser = function () {
        this.express.use(express_1["default"].urlencoded({ extended: true }));
        this.express.use(express_1["default"].json());
    };
    Swagger.prototype.useCorrelation = function (correlationHeaderName) {
        var _this = this;
        if (correlationHeaderName === void 0) { correlationHeaderName = 'x-correlation-id'; }
        this.express.use(function (req, _res, next) {
            _this.correlator.withId(next, req.get(correlationHeaderName));
        });
    };
    Swagger.prototype.useCors = function (origin) {
        var corsMidlleWare = (0, cors_1["default"])({ origin: origin });
        this.express.options('*', corsMidlleWare);
        this.express.use(corsMidlleWare);
    };
    Swagger.prototype.registerApiRoutes = function () {
        (0, routes_1.RegisterRoutes)(this.express);
    };
    Swagger.prototype.registerApiDocs = function (definitionsPath) {
        var _this = this;
        if ('development' === this.config.env) {
            // Reload OAS for each query
            this.express.use('/docs', swagger_ui_express_1["default"].serve, function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _b = (_a = res).send;
                            _d = (_c = swagger_ui_express_1["default"]).generateHTML;
                            return [4 /*yield*/, this.loadDefinitionsFile(definitionsPath)];
                        case 1: return [2 /*return*/, _b.apply(_a, [_d.apply(_c, [_e.sent()])])];
                    }
                });
            }); });
        }
        else {
            // Load OAS only once on startup
            this.loadDefinitionsFile(definitionsPath).then(function (definitions) {
                _this.express.use('/docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(definitions));
            });
        }
        // Host swagger.json
        this.express.use('/swagger.json', express_1["default"].static(definitionsPath));
    };
    Swagger.prototype.catchErrors = function () {
        this.express.use(function errorHandler(error, req, res, next) {
            if (error instanceof tsoa_1.ValidateError) {
                console.warn("Caught EntityError for ".concat(req.path, ":"), error.fields);
                return res.status(constants_1.EHttpStatus.ClientErrorUnprocessableEntity).json({
                    message: 'Validation Failed',
                    details: error === null || error === void 0 ? void 0 : error.fields
                });
            }
            else if (error instanceof errors_1.ValidationError) {
                console.warn("Caught EntityError for ".concat(req.path, ":"), {
                    message: error.message
                });
                return res.status(constants_1.EHttpStatus.ClientErrorUnprocessableEntity).json({
                    message: 'Validation Failed',
                    details: { message: error.message }
                });
            }
            else if (error instanceof errors_1.RepositoryError) {
                console.error('repository error', { error: error });
                return res.status(constants_1.EHttpStatus.ServerErrorInternal).json({
                    message: 'Internal Server Error'
                });
            }
            else if (error instanceof Error) {
                console.error('internal error', { error: error });
                return res.status(constants_1.EHttpStatus.ServerErrorInternal).json({
                    message: 'Internal Server Error'
                });
            }
            next();
        });
    };
    Swagger.prototype.catchAll = function () {
        this.express.use(function notFoundHandler(_req, res) {
            res.status(constants_1.EHttpStatus.ClientErrorNotFound).send({
                message: 'URL Not Found'
            });
        });
    };
    /************  PRIVATE METHODS *************/
    Swagger.prototype.loadDefinitionsFile = function (definitionsPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve().then(function () { return require(definitionsPath); })];
            });
        });
    };
    return Swagger;
}());
exports.Swagger = Swagger;
