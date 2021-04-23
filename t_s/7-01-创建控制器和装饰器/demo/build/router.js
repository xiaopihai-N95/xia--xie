"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("\n    <html>\n      <body>\n        <form action=\"/getData\" method=\"post\">\n          <input type=\"password\" name=\"password\" value=\"\">\n          <button type=\"submit\">\u767B\u5F55</button>\n        </form>\n      </body>\n    </html>\n  ");
});
router.post('/getData', function (req, res) {
    console.log('getData success');
});
exports.default = router;
