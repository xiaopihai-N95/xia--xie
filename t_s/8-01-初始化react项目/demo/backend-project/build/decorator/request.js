"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
require("reflect-metadata");
var routerFactory = function (type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
};
exports.Get = routerFactory('get');
exports.Post = routerFactory('post');
