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
exports.LoginControlller = void 0;
var util_1 = __importDefault(require("../utils/util"));
var decorator_1 = require("../decorator");
var LoginControlller = /** @class */ (function () {
    function LoginControlller() {
    }
    LoginControlller_1 = LoginControlller;
    LoginControlller.isLogin = function (req) {
        var _a;
        return !!((_a = req.session) === null || _a === void 0 ? void 0 : _a.login);
    };
    LoginControlller.prototype.isLogin = function (req, res) {
        res.json(util_1.default(LoginControlller_1.isLogin(req)));
    };
    LoginControlller.prototype.home = function (req, res) {
        var _a;
        var isLogin = !!((_a = req.session) === null || _a === void 0 ? void 0 : _a.login);
        if (isLogin) {
            res.send("\n        <html>\n          <body>\n            <a href=\"/getData\">\u722C\u53D6\u6570\u636E</a>\n            <a href=\"/showData\">\u67E5\u770B\u6570\u636E</a>\n            <a href=\"/logout\">\u767B\u51FA</a>\n          </body>\n        </html>\n      ");
        }
        else {
            res.send("\n        <html>\n          <body>\n            <form action=\"/login\" method=\"post\">\n              <input type=\"password\" name=\"password\" value=\"\">\n              <button type=\"submit\">\u767B\u5F55</button>\n            </form>\n          </body>\n        </html>\n      ");
        }
    };
    LoginControlller.prototype.login = function (req, res) {
        var _a;
        var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
        var password = req.body.password;
        if (isLogin) {
            // res.send('已经登录')
            res.json(util_1.default(false, '已经登录'));
        }
        else {
            if (password === '123' && req.session) {
                req.session.login = true;
                // res.send('登录成功')
                res.json(util_1.default(true));
            }
            else {
                // res.send('登录失败')
                res.json(util_1.default(false, '登录失败'));
            }
        }
    };
    LoginControlller.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        // res.redirect('/')
        res.json(util_1.default(true));
    };
    var LoginControlller_1;
    __decorate([
        decorator_1.Get('/api/isLogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControlller.prototype, "isLogin", null);
    __decorate([
        decorator_1.Get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControlller.prototype, "home", null);
    __decorate([
        decorator_1.Post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControlller.prototype, "login", null);
    __decorate([
        decorator_1.Get('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControlller.prototype, "logout", null);
    LoginControlller = LoginControlller_1 = __decorate([
        decorator_1.Controller('/')
    ], LoginControlller);
    return LoginControlller;
}());
exports.LoginControlller = LoginControlller;
