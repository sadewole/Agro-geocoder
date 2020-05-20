"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _db["default"].User;

var hash = _helper["default"].hashPassword(process.env.DEFAULT_PASSWORD);

User.create({
  id: (0, _v["default"])(),
  firstName: process.env.DEFAULT_FIRST_NAME,
  lastName: process.env.DEFAULT_LAST_NAME,
  email: process.env.DEFAULT_EMAIL,
  password: hash,
  isAdmin: process.env.DEFAULT_IsAdmin
}).then(function (defaultAdmin) {
  console.log(defaultAdmin);
})["catch"](function (err) {
  console.log(err);
});