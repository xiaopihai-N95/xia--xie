"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
var crowler_1 = __importDefault(require("./crowler"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('hello world!!');
});
router.get('/getData', function (req, res) {
    // http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx
    var key = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + key;
    var dellAnalyzer = dellAnalyzer_1.default.createInstance();
    new crowler_1.default(url, dellAnalyzer);
    res.send('getData success');
});
exports.default = router;
