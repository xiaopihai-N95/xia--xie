"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = exports.Controller = exports.Post = exports.Get = void 0;
require("reflect-metadata");
var router_1 = __importDefault(require("../router"));
function RouterFactory(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.Get = RouterFactory('get');
exports.Post = RouterFactory('post');
var Controller = function (target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        var handler = target.prototype[key];
        if (path && method && handler) {
            if (middleware) {
                router_1.default[method](path, middleware, handler);
            }
            else {
                router_1.default[method](path, handler);
            }
        }
    }
};
exports.Controller = Controller;
var Use = function (middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
};
exports.Use = Use;
