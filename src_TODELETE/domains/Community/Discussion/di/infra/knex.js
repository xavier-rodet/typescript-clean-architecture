"use strict";
exports.__esModule = true;
exports.knex = void 0;
var knex_1 = require("knex");
var config_1 = require("../../infra/knex/config");
exports.knex = (0, knex_1["default"])(config_1["default"]);
