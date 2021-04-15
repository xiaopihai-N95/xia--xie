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
    DellAnalyzer.prototype.getSourseInfo = function (html, path) {
        var $ = cheerio_1.default.load(html);
        var itemArr = $('.course-item');
        var result = [];
        var data = {
            time: new Date().getTime(),
            data: result
        };
        var originContent = '';
        var finalResult = {};
        itemArr.map(function (index, item) {
            var courseInfo = $(item).find('.course-desc');
            var name = courseInfo.eq(0).text();
            var count = parseInt(courseInfo.eq(1).text().split('：')[1], 10);
            var lessonItem = { name: name, count: count };
            result.push(lessonItem);
        });
        if (fs_1.default.existsSync(path)) {
            originContent = fs_1.default.readFileSync(path, 'utf-8');
            finalResult = originContent ? JSON.parse(originContent) : {};
        }
        finalResult[data.time] = data.data;
        console.log(finalResult);
        return JSON.stringify(finalResult);
    };
    DellAnalyzer.prototype.analyze = function (html, path) {
        var result = this.getSourseInfo(html, path);
        return result;
    };
    DellAnalyzer.CreateInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
