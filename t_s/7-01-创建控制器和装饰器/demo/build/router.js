"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    var _a;
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        res.send();
    }
    else {
        res.redirect('/login');
    }
});
router.get('/login', function (req, res) {
    res.send("\n    <html>\n      <body>\n        <form action=\"/getData\" method=\"post\">\n          <input type=\"password\" name=\"password\" value=\"\">\n          <button type=\"submit\">\u767B\u5F55</button>\n        </form>\n      </body>\n    </html>\n  ");
});
router.post('/getData', function (req, res) {
    var password = (req === null || req === void 0 ? void 0 : req.body).password;
    if (password === '123') {
        res.send('getData success');
    }
    else {
        res.send('password error');
    }
});
exports.default = router;
