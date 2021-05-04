"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowler_1 = __importDefault(require("./utils/crowler"));
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = __importDefault(require("./utils/util"));
// 因为 getData 和 showData 结构相同都判断了登陆状态, 所以自己定义一个业务逻辑中间件
var checkLogin = function (req, res, next) {
    var _a;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.default(null, '请先登录'));
    }
};
var router = express_1.Router();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n      <html>\n        <body>\n          <a href=\"/getData\">\u722C\u53D6\u5185\u5BB9</a>\n          <a href=\"/showData\">\u67E5\u770B\u7ED3\u679C</a>\n          <a href=\"/logout\">\u9000\u51FA</a>\n        </body>\n      </html>\n    ");
    }
    else {
        res.send("\n    <html>\n      <body>\n        <form method=\"post\" action=\"/login\">\n          <input type=\"password\" name=\"password\" value=\"\">\n          <button type=\"submit\">\u767B\u5F55</button>\n        </form>\n      </body>\n    </html>\n  ");
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json(util_1.default(true));
});
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json(util_1.default(false, '已经登陆'));
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.json(util_1.default(true));
        }
        else {
            res.json(util_1.default(false, '登陆失败'));
        }
    }
});
router.get('/getData', checkLogin, function (req, res) {
    var key = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + key;
    var dellAnalyzer = analyzer_1.default.createInstance();
    new crowler_1.default(url, dellAnalyzer);
    res.json(util_1.default(true));
});
router.get('/showData', checkLogin, function (req, res) {
    try {
        var filePath = path_1.default.resolve(__dirname, '../data/crowler.json');
        var content = fs_1.default.readFileSync(filePath, 'utf-8');
        res.json(util_1.default(JSON.parse(content)));
    }
    catch (e) {
        res.json(util_1.default(false, '未爬取到内容'));
    }
});
exports.default = router;
