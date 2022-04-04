"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var users_1 = __importDefault(require("./users"));
var products_1 = __importDefault(require("./products"));
var indexRoute = function (app) {
    (0, users_1["default"])(app);
    (0, products_1["default"])(app);
};
exports["default"] = indexRoute;
