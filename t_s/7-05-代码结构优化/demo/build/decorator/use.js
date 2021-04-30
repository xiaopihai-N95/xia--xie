"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = void 0;
require("reflect-metadata");
var Use = function (middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
};
exports.Use = Use;
