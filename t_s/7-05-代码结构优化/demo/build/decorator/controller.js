"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
require("reflect-metadata");
var router_1 = __importDefault(require("../router"));
var Controller = function (root) {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var middlewares = Reflect.getMetadata('middlewares', target.prototype, key);
            var handler = target.prototype[key];
            if (path && method) {
                var fullPath = root === '/' ? path : "" + root + path;
                if (middlewares === null || middlewares === void 0 ? void 0 : middlewares.length) {
                    router_1.default[method].apply(router_1.default, __spreadArray(__spreadArray([fullPath], middlewares), [handler]));
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
};
exports.Controller = Controller;
