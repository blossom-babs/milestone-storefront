"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let secret;
let token;
if (process.env.TOKEN_SECRET) {
    secret = process.env.TOKEN_SECRET;
}
const verifyAuthToken = (req, res, next) => {
    var _a;
    try {
        const authToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (authToken)
            token = authToken;
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res
            .status(201)
            .json({ Message: 'You are not authorized for this service' });
    }
};
exports.default = verifyAuthToken;
