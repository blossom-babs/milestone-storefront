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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const verifyAuthToken_1 = __importDefault(require("./auth/verifyAuthToken"));
const store = new users_1.UserStore();
let secret;
if (process.env.TOKEN_SECRET) {
    secret = process.env.TOKEN_SECRET;
}
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        if (users.length < 1) {
            res.status(200).json({ Message: 'You have no users yet' });
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        res
            .status(400)
            .json({ Message: `Something went wrong with your query ${error}` });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.create(req.body);
        const jsonToken = jsonwebtoken_1.default.sign(req.body, secret);
        res.status(200).json({ user, jsonToken });
    }
    catch (error) {
        res
            .status(400)
            .json({ Message: `Something went wrong with your query ${error}` });
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.authenticate(req.body.firstName, req.body.password);
        res.status(200).json(user);
    }
    catch (error) {
        res
            .status(200)
            .json({ Message: `Something went wrong with your query ${error}` });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        if (!user) {
            res.status(200).json({ Message: 'User does not exist' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res
            .status(400)
            .json({ Message: `Something went wrong with your query ${error}` });
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.destroy(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res
            .status(400)
            .json({ Message: `Something went wrong with your query ${error}` });
    }
});
const UserRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.default, index);
    app.post('/users', create);
    app.post('/login', verifyAuthToken_1.default, authenticate);
    app.get('/users/:id', verifyAuthToken_1.default, show);
    app.delete('/users/:id', verifyAuthToken_1.default, destroy);
};
exports.default = UserRoutes;
