"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _orderController = _interopRequireDefault(require("../../controller/orderController"));

require("../../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/').get(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].getAllOrder).post(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].addNewOrder);
router.route('/user/:id').get(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].getUserHistory);
router.route('/:id').get(_orderController["default"].getSingleOrder).put(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].updateQuantity)["delete"](_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].deleteOrder);
var _default = router;
exports["default"] = _default;