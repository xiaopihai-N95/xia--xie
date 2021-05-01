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
var analyzer_1 = __importDefault(require("../analyzer"));
var crowler_1 = __importDefault(require("../crowler"));
var util_1 = __importDefault(require("../utils/util"));
var CrowlerController = /** @class */ (function () {
    function CrowlerController() {
    }
    CrowlerController.prototype.getData = function (req, res) {
        var key = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + key;
        var AnalyzerInstance = analyzer_1.default.createInstance();
        new crowler_1.default(url, AnalyzerInstance);
        res.json(util_1.default(true));
    };
    __decorate([
        Get('/getData'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Request, Response]),
        __metadata("design:returntype", void 0)
    ], CrowlerController.prototype, "getData", null);
    CrowlerController = __decorate([
        Controller
    ], CrowlerController);
    return CrowlerController;
}());
