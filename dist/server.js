"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./handlers/products"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:8090';
var port = 8090;
app.use(express_1["default"].json());
(0, products_1["default"])(app);
app.get('/', function (req, res) {
    res.status(200).json({
        Message: "You have accessed Blossom store's front. The following routes are available to be accessed: /products, /users, /orders."
    });
});
app.get('*', function (req, res) {
    res
        .status(200)
        .json({ Message: 'You tried to access a route that does not exist' });
});
app.listen(port, function () {
    console.log("starting app on: ".concat(address));
});
