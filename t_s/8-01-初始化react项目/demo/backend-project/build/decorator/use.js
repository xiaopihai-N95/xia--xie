"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = void 0;
require("reflect-metadata");
var Use = function (middleware) {
    return function (target, key) {
        var middlewares = Reflect.getMetadata('middlewares', target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata('middlewares', middlewares, target, key);
    };
};
exports.Use = Use;
