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
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
let pepper;
let salt;
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
if (BCRYPT_PASSWORD && SALT_ROUNDS) {
    pepper = BCRYPT_PASSWORD;
    salt = Number(SALT_ROUNDS);
}
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot get users. Returned with error ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users WHERE id=${id}`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot get user. Returned with error ${error}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                user.password = yield bcrypt_1.default.hash(user.password + pepper, salt);
                const sql = `INSERT INTO users (firstName, lastName, password) VALUES  ($1, $2, $3) RETURNING *`;
                const userValues = Object.values(user);
                const result = yield conn.query(sql, userValues);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create user. Returned with error ${error}`);
            }
        });
    }
    authenticate(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM users WHERE firstName='${name}'`;
                const result = yield conn.query(sql);
                let response = '';
                if (result.rows.length) {
                    const user = result.rows[0];
                    const match = yield bcrypt_1.default.compare(password + pepper, user.password);
                    if (match) {
                        response = user;
                    }
                    else {
                        response = 'Incorrect password';
                    }
                }
                conn.release();
                return response || 'User does not exist';
            }
            catch (error) {
                throw new Error(`Cannot authenticate user. Returned with error ${error}`);
            }
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM users WHERE id=${id} RETURNING *`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delte user. Returned with error ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
