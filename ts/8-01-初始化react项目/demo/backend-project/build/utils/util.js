"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getResposeData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: data
        };
    }
    else {
        return {
            success: true,
            data: data
        };
    }
};
exports.default = getResposeData;
