"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const products_1 = __importDefault(require("./products"));
const indexRoute = (app) => {
    (0, users_1.default)(app);
    (0, products_1.default)(app);
};
exports.default = indexRoute;
