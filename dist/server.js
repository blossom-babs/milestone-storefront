"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var books_1 = __importDefault(require("./handlers/books"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
(0, books_1["default"])(app);
app.get('*', function (req, res) {
    res.status(200).json({ Message: 'You tried to access a route that does not exist' });
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
