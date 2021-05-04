"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var crowler_1 = __importDefault(require("./utils/crowler"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = __importDefault(require("./utils/util"));
var checkLogin = function (req, res, next) {
    var _a;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.default(null, '请先登录'));
        // res.send('请先登录')
    }
};
var router = express_1.Router();
router.get('/', function () { });
router.post('/login', function (req, res) {
    var _a;
    var password = req.body.password;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        res.json(util_1.default(false, '已经登陆'));
        // res.send('已经登陆')
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            // res.send('登录成功')
            res.json(util_1.default(true));
        }
        else {
            // res.send('登陆失败')
            res.json(util_1.default(false, '登陆失败'));
        }
    }
});
router.get('/logout', function (req, res) {
    if (req.session)
        req.session.login = undefined;
    // res.redirect('/')
    res.json(util_1.default(true));
});
router.get('/getData', checkLogin, function (req, res) {
    var key = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + key;
    var CourseAnalyzer = analyzer_1.default.createInstance();
    new crowler_1.default(url, CourseAnalyzer);
    res.json(util_1.default(true));
});
router.get('/showData', checkLogin, function (req, res) {
    try {
        var filePath = path_1.default.resolve(__dirname, '../data/data.json');
        var result = fs_1.default.readFileSync(filePath, 'utf-8');
        // res.json(JSON.parse(result))
        res.json(util_1.default(JSON.parse(result)));
    }
    catch (e) {
        // res.send('未爬取到内容')
        res.json(util_1.default(false, '未爬取到内容'));
    }
});
exports.default = router;
