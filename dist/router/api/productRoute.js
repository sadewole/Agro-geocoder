"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _productController = _interopRequireDefault(require("../../controller/productController"));

var _multer = _interopRequireDefault(require("../../middlewares/multer"));

var _passport = _interopRequireDefault(require("passport"));

require("../../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// as strategy in ./passport.js needs passport object
var router = (0, _express.Router)();
router.route('/').get(_productController["default"].getAllProduct).post(_passport["default"].authenticate('jwt', {
  session: false
}), _multer["default"].single('image'), _productController["default"].createProduct);
router.route('/:id').get(_passport["default"].authenticate('jwt', {
  session: false
}), _productController["default"].getSingleProduct).put(_passport["default"].authenticate('jwt', {
  session: false
}), _productController["default"].updateProduct)["delete"](_passport["default"].authenticate('jwt', {
  session: false
}), _productController["default"].deleteProduct);
var _default = router;
exports["default"] = _default;