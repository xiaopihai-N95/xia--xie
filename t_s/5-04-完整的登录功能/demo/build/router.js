"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowler_1 = __importDefault(require("./crowler"));
var dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("\n    <html>\n      <body>\n        <form method=\"post\" action=\"/getData\">\n          <input type=\"password\" name=\"password\" value=\"\">\n          <button type=\"submit\">\u63D0\u4EA4</button>\n        </form>\n      </body>\n    </html>\n  ");
});
router.post('/getData', function (req, res) {
    var password = req.body.password;
    if (password === '123') {
        var key = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + key;
        var dellAnalyzer = dellAnalyzer_1.default.createInstance();
        new crowler_1.default(url, dellAnalyzer);
        res.send('getData success');
    }
    else {
        res.send('password error');
    }
});
exports.default = router;
