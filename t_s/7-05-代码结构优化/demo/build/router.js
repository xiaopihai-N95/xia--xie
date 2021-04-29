"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = require("express");
var crowler_1 = __importDefault(require("./crowler"));
var analyzer_1 = __importDefault(require("./analyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    var _a;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        res.send("\n      <html>\n        <body>\n          <a href=\"/getData\">\u722C\u53D6\u6570\u636E</a>\n          <a href=\"/showData\">\u67E5\u770B\u6570\u636E</a>\n          <a href=\"/logout\">\u767B\u51FA</a>\n        </body>\n      </html>\n    ");
    }
    else {
        res.send("\n      <html>\n        <body>\n          <form action=\"/login\" method=\"post\">\n            <input type=\"password\" name=\"password\" value=\"\">\n            <button>\u767B\u5F55</button>\n          </form>\n        </body>\n      </html>\n    ");
    }
});
router.post('/login', function (req, res) {
    var _a;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    var password = req.body.password;
    if (!isLogin) {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.send('登录成功');
        }
        else {
            res.send('密码错误');
        }
    }
    else {
        res.send('已经登录');
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect('/');
});
router.get('/getData', function (req, res) {
    var _a;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        var key = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + key;
        var crowlerAnalyzer = analyzer_1.default.createInstance();
        new crowler_1.default(url, crowlerAnalyzer);
        res.send('爬取成功');
    }
    else {
        res.send('请先登录');
    }
});
router.get('/showData', function (req, res) {
    var _a;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../data/data.json');
            var fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
            res.json(JSON.parse(fileContent));
        }
        catch (e) {
            res.send('没有数据');
        }
    }
    else {
        res.send('请先登录');
    }
});
exports.default = router;
