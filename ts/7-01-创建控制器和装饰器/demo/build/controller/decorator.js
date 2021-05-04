"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.get = exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
// 装饰器接受的路径与对应的方法绑定
function get(path) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata('path', path, target, key);
    };
}
exports.get = get;
// 类装饰器统一获取路径
// 对于没有使用装饰器的方法会遍历到一个 undefined
function Controller(target) {
    // 循环类中的属性方法
    for (var key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key))
        // 提取原型中对应方法的元数据
        var path = Reflect.getMetadata('path', target.prototype, key);
        // 获取原型中对应方法
        var handler = target.prototype[key];
        // 如果 path 存在就创建路由
        path && exports.router.get(path, handler);
    }
}
exports.Controller = Controller;
