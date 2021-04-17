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
        var dataArr = $('.course-item');
        var dataArray = [];
        var data = { time: new Date().getTime(), data: dataArray };
        dataArr.map(function (index, item) {
            var lesson = $(item).find('.course-desc');
            var name = lesson.eq(0).text();
            var count = parseInt(lesson.eq(1).text().split('：')[1]);
            var dataItem = { name: name, count: count };
            dataArray.push(dataItem);
        });
        // console.log(data)
        return data;
    };
    DellAnalyzer.prototype.readFile = function (data, filePath) {
        var fileObj = {};
        if (fs_1.default.existsSync(filePath)) {
            var fileOriginData = fs_1.default.readFileSync(filePath, 'utf-8') || JSON.stringify({});
            fileObj = JSON.parse(fileOriginData);
        }
        fileObj[data.time] = data.data;
        return JSON.stringify(fileObj);
    };
    DellAnalyzer.prototype.analyzer = function (html, filePath) {
        var data = this.getData(html);
        var fileContent = this.readFile(data, filePath);
        return fileContent;
    };
    DellAnalyzer.createInstance = function () {
        if (!DellAnalyzer.analyzerInstance) {
            DellAnalyzer.analyzerInstance = new DellAnalyzer();
        }
        return DellAnalyzer.analyzerInstance;
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
