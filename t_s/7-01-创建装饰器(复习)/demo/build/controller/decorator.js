"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.Post = exports.Get = exports.getRequestDecorator = exports.router = void 0;
var express_1 = require("express");
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
exports.router = express_1.Router();
/* export function Get(path: string) {
  return function (target: typeof LoginController.prototype, key: string) {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', 'get', target, key)
  }
}

export function Post(path: string) {
  return function (target: typeof LoginController.prototype, key: string) {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', 'post', target, key)
  }
} */
// 高度相似, 冗余, 用工厂方式生成
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.getRequestDecorator = getRequestDecorator;
exports.Get = getRequestDecorator('get');
exports.Post = getRequestDecorator('post');
function Controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        path && method && handler && exports.router[method](path, handler);
    }
}
exports.Controller = Controller;
