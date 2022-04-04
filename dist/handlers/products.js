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
const products_1 = require("../models/products");
const verifyAuthToken_1 = __importDefault(require("./auth/verifyAuthToken"));
const productStore = new products_1.ProductStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const result = yield productStore.create(product);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(204).json({ Message: `Error with saving product` });
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productStore.index();
        if (result.length < 1) {
            res
                .status(200)
                .json({ Message: 'You have product saved in the library' });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res
            .status(200)
            .json({ message: `Could not fetch product with error ${error}` });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    try {
        const category = req.query.cat;
        console.log(category);
        console.log('shey nothing con they log ni');
        const id = req.query.id;
        const result = yield productStore.show(id, category);
        if (result === undefined) {
            res
                .status(200)
                .json({ Message: `Product with id ${id} cannot be found.` });
            return;
        }
        res.status(200).json(result);
    }
    catch (error) {
        res
            .status(200)
            .json({ message: `Could not fetch product with id ${req.params.id}` });
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield productStore.delete(id);
        res.status(200).json(result);
    }
    catch (error) {
        throw new Error(`Could not retrieve product: ${error}`);
    }
});
const ProductStores = (app) => {
    app.post('/products', verifyAuthToken_1.default, create);
    app.get('/products', index);
    app.get('/products/?cat=', show);
    app.delete('/products/:id', destroy);
};
exports.default = ProductStores;
