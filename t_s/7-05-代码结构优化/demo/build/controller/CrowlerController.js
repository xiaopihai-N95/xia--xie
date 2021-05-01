"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrowlerController = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var decorator_1 = require("../decorator");
var util_1 = __importDefault(require("../utils/util"));
var analyzer_1 = __importDefault(require("../utils/analyzer"));
var crowler_1 = __importDefault(require("../utils/crowler"));
var checkLogin = function (req, res, next) {
    var _a;
    var isLogin = !!((_a = req.session) === null || _a === void 0 ? void 0 : _a.login);
    if (isLogin) {
        next();
    }
    else {
        // res.send('请先登录')
        res.json(util_1.default(null, '请先登录'));
    }
    console.log('first middleware');
};
var testSecondMiddleware = function (req, res, next) {
    console.log('second middleware');
    next();
};
var CrowlerController = /** @class */ (function () {
    function CrowlerController() {
    }
    CrowlerController.prototype.getData = function (req, res) {
        var key = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + key;
        var crowlerAnalyzer = analyzer_1.default.createInstance();
        new crowler_1.default(url, crowlerAnalyzer);
        // res.send('爬取成功')
        res.json(util_1.default(true));
    };
    CrowlerController.prototype.showData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/data.json');
            var fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
            // res.json(JSON.parse(fileContent))
            res.json(util_1.default(JSON.parse(fileContent)));
        }
        catch (e) {
            // res.send('没有数据')
            res.json(util_1.default(false, '没有数据'));
        }
    };
    __decorate([
        decorator_1.Get('/getData'),
        decorator_1.Use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowlerController.prototype, "getData", null);
    __decorate([
        decorator_1.Get('/showData'),
        decorator_1.Use(checkLogin),
        decorator_1.Use(testSecondMiddleware),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowlerController.prototype, "showData", null);
    CrowlerController = __decorate([
        decorator_1.Controller('/abc')
    ], CrowlerController);
    return CrowlerController;
}());
exports.CrowlerController = CrowlerController;
