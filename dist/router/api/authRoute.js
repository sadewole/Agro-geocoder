"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _helper = _interopRequireDefault(require("../../middlewares/helper"));

var _authController = _interopRequireDefault(require("../../controller/authController"));

var _passport = _interopRequireDefault(require("passport"));

require("../../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// as strategy in ./passport.js needs passport object
// init Router
var router = (0, _express.Router)();
router.route('/signup').post(_helper["default"].validateBody(_helper["default"].schemas.authSchema), _authController["default"].signup);
router.route('/signin').post(_passport["default"].authenticate('local', {
  session: false
}), _helper["default"].validateBody(_helper["default"].schemas.signSchema), _authController["default"].signin);
router.route('/secret').get(_passport["default"].authenticate('jwt', {
  session: false
}), _authController["default"].secret);
var _default = router;
exports["default"] = _default;