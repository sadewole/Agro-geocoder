"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../../controller/userController"));

var _passport = _interopRequireDefault(require("passport"));

require("../../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// as strategy in ./passport.js needs passport object
// init Router
var router = (0, _express.Router)();
router.route('/').get(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].getAllUser);
router.route('/:id').get(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].getSingleUser)["delete"](_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].deleteUser);
var _default = router;
exports["default"] = _default;