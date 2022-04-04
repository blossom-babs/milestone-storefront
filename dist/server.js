"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handlers_1 = __importDefault(require("./handlers"));
const app = (0, express_1.default)();
const address = '0.0.0.0:8090';
const port = 8090;
app.use(express_1.default.json());
(0, handlers_1.default)(app);
app.get('/', (req, res) => {
    res.status(200).json({
        Message: `You have accessed Blossom store's front. The following routes are available to be accessed: /products, /users, /orders.`,
    });
});
app.get('*', (req, res) => {
    res
        .status(200)
        .json({ Message: 'You tried to access a route that does not exist' });
});
app.listen(port, () => {
    console.log(`starting app on: ${address}`);
});
