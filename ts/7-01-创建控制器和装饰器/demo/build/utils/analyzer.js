"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.prototype.getData = function (html) {
        var $ = cheerio_1.default.load(html);
        var items = $('.course-item');
        var data = [];
        var outputData = { time: new Date().getTime(), data: data };
        items.map(function (index, item) {
            var course = $(item).find('.course-desc');
            var name = course.eq(0).text();
            var count = parseInt(course.eq(1).text().split('：')[1]);
            data.push({ name: name, count: count });
        });
        return outputData;
    };
    Analyzer.prototype.readFile = function (data, filePath) {
        var outputData = {};
        if (fs_1.default.existsSync(filePath)) {
            var originData = fs_1.default.readFileSync(filePath, 'utf-8') || JSON.stringify({});
            outputData = JSON.parse(originData);
        }
        outputData[data.time] = data.data;
        return JSON.stringify(outputData);
    };
    Analyzer.prototype.createAnalyzer = function (html, filePath) {
        var data = this.getData(html);
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
