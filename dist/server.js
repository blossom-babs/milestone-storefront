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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var books_1 = require("./models/books");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allBooks, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    allBooks = new books_1.BookStore();
                    return [4 /*yield*/, allBooks.index()];
                case 1:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    throw new Error("Could not retrieve books: ".concat(error_1));
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                book = new books_1.BookStore();
                return [4 /*yield*/, book.show(id)];
            case 1:
                result = _a.sent();
                if (result === undefined) {
                    res.status(200).json({ Message: "Book with id ".concat(id, " cannot be found.") });
                    return [2 /*return*/];
                }
                else {
                    res.status(200).json(result);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                throw new Error("Could not retrieve book: ".concat(error_2));
            case 3: return [2 /*return*/];
        }
    });
}); });
app["delete"]('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, removeBook, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                removeBook = new books_1.BookStore();
                return [4 /*yield*/, removeBook["delete"](id)
                    // what if id is valid but not available in the db
                ];
            case 1:
                result = _a.sent();
                // what if id is valid but not available in the db
                res.status(200).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                throw new Error("Could not retrieve book: ".concat(error_3));
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, addBook, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                book = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                addBook = new books_1.BookStore();
                return [4 /*yield*/, addBook.create(book)];
            case 2:
                result = _a.sent();
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.send(404).json({ Message: "Unable to save book ".concat(book.title) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, id, editBook, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                book = req.body;
                console.log(book);
                id = req.params.id;
                editBook = new books_1.BookStore();
                return [4 /*yield*/, editBook.update(id, book)];
            case 1:
                result = _a.sent();
                res.status(400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(400).json({ message: "".concat(error_5) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
