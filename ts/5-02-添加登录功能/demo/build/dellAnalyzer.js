"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.prototype.getData = function (html) {
        var $ = cheerio_1.default.load(html);
        var items = $('.course-item');
        var data = [];
        var result = { time: new Date().getTime(), data: data };
        items.map(function (index, item) {
            var lesson = $(item).find('.course-desc');
            var name = lesson.eq(0).text();
            var count = parseInt(lesson.eq(1).text().split('：')[1]);
            data.push({ name: name, count: count });
        });
        return result;
    };
    DellAnalyzer.prototype.readFile = function (data, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            var fileOriginContent = fs_1.default.readFileSync(filePath, 'utf-8') || JSON.stringify({});
            fileContent = JSON.parse(fileOriginContent);
        }
        fileContent[data.time] = data.data;
        return JSON.stringify(fileContent);
    };
    DellAnalyzer.prototype.analyzer = function (html, filePath) {
        var data = this.getData(html);
        var fileContent = this.readFile(data, filePath);
        return fileContent;
    };
    DellAnalyzer.createInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
