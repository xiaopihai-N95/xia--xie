"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var express_1 = require("express");
var analyzer_1 = __importDefault(require("./analyzer"));
var crowler_1 = __importDefault(require("./crowler"));
var util_1 = __importDefault(require("./utils/util"));
var router = express_1.Router();
var checkLogin = function (req, res, next) {
    var _a;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        next();
    }
    else {
        // res.send('请先登录')
        res.json(util_1.default(null, '请先登录'));
    }
};
router.get('/getData', checkLogin, function (req, res) {
    var key = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + key;
    var AnalyzerInstance = analyzer_1.default.createInstance();
    new crowler_1.default(url, AnalyzerInstance);
    res.json(util_1.default(true));
});
router.get('/showData', checkLogin, function (req, res) {
    var filePath = path_1.default.resolve(__dirname, '../data/data.json');
    var fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
    // res.send(JSON.parse(fileContent))
    res.json(util_1.default(JSON.parse(fileContent)));
});
exports.default = router;
