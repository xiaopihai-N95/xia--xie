"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.prototype.getData = function (html) {
        var $ = cheerio_1.default.load(html);
        var items = $('.course-item');
        var data = [];
        var result = { time: new Date().getTime(), data: data };
        items.map(function (index, ele) {
            var result = $(ele).find('.course-desc');
            var name = result.eq(0).text();
            var count = parseInt(result.eq(1).text().split('：')[1]);
            data.push({ name: name, count: count });
        });
        return result;
    };
    Analyzer.prototype.readFile = function (data, filePath) {
        var result = {};
        if (fs_1.default.existsSync(filePath)) {
            var fileData = fs_1.default.readFileSync(filePath, 'utf-8') || JSON.stringify({});
            result = JSON.parse(fileData);
        }
        result[data.time] = data.data;
        return JSON.stringify(result);
    };
    Analyzer.prototype.analyzer = function (content, filePath) {
        var data = this.getData(content);
        var fileContent = this.readFile(data, filePath);
        return fileContent;
    };
    Analyzer.createInstance = function () {
        if (!Analyzer.instance) {
            Analyzer.instance = new Analyzer;
        }
        return Analyzer.instance;
    };
    return Analyzer;
}());
exports.default = Analyzer;
