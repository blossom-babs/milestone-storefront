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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM products`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot get Products: ${error}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
                const productValues = Object.values(product);
                const result = yield conn.query(sql, productValues);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot save product: ${error}`);
            }
        });
    }
    show(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM products WHERE id=${id} OR category='${category}'`;
                console.log('here is the query command:', sql);
                const result = yield conn.query(sql);
                console.log('here is the result:', result);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot get product with id ${id}: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM products WHERE id=${id} RETURNING *`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delete product with id ${id}: ${error}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
