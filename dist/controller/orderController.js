"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Order = _db["default"].Order;
var _default = {
  getAllOrder: function getAllOrder(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var orders, data, i, order, product, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(req.user.isAdmin !== true)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                message: 'Unauthorised'
              }));

            case 3:
              _context.next = 5;
              return Order.findAll({});

            case 5:
              orders = _context.sent;

              if (!(orders.length < 1)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(200).json({
                message: 'Order history is empty'
              }));

            case 8:
              data = [];
              i = 0;

            case 10:
              if (!(i < orders.length)) {
                _context.next = 22;
                break;
              }

              order = orders[i].dataValues;
              _context.next = 14;
              return _helper["default"].checkProduct(order.product_id);

            case 14:
              product = _context.sent;
              _context.next = 17;
              return _helper["default"].findUserById(order.user_id);

            case 17:
              user = _context.sent;
              data.push(Object.assign(order, {
                product: product,
                user: user
              }));

            case 19:
              i++;
              _context.next = 10;
              break;

            case 22:
              return _context.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                count: data.length,
                status: 'success',
                message: 'List of orders',
                data: data
              }));

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", res.status(500).json({
                status: 'error',
                message: _context.t0.message
              }));

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 25]]);
    }))();
  },
  addNewOrder: function addNewOrder(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _req$body, quantity, productId, findProduct, data;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, quantity = _req$body.quantity, productId = _req$body.productId;
              _context2.prev = 1;
              quantity = Number(quantity);

              if (!(!productId && !quantity)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                message: 'Field is not allowed to be empty'
              }));

            case 5:
              _context2.next = 7;
              return _helper["default"].checkProduct(productId);

            case 7:
              findProduct = _context2.sent;

              if (findProduct) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(403).json({
                message: 'Error, No such menu'
              }));

            case 10:
              _context2.next = 12;
              return Order.create({
                id: (0, _v["default"])(),
                product_id: findProduct.id,
                user_id: req.user.id,
                quantity: quantity,
                amount: quantity * findProduct.price
              });

            case 12:
              data = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                TYPE: 'POST',
                status: 'success',
                message: 'Order created successfully',
                data: data
              }));

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);
              res.status(500).json({
                status: 'error',
                message: _context2.t0.message
              });

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 16]]);
    }))();
  },
  getSingleOrder: function getSingleOrder(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var id, data, findOne, order, product, user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.prev = 1;
              data = [];
              _context3.next = 5;
              return Order.findOne({
                where: {
                  id: id
                }
              });

            case 5:
              findOne = _context3.sent;

              if (findOne) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                message: 'Order Not Found'
              }));

            case 8:
              order = findOne.dataValues;
              _context3.next = 11;
              return _helper["default"].checkProduct(order.product_id);

            case 11:
              product = _context3.sent;
              _context3.next = 14;
              return _helper["default"].findUserById(order.user_id);

            case 14:
              user = _context3.sent;
              data.push(Object.assign(order, {
                product: product,
                user: user
              }));
              return _context3.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                status: 'success',
                message: 'Request successful',
                data: data
              }));

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](1);
              res.status(500).json({
                status: 'error',
                message: _context3.t0.message
              });

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 19]]);
    }))();
  },
  updateQuantity: function updateQuantity(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var id, quantity, findId, findMenu, data;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              quantity = req.body.quantity;
              _context4.prev = 2;
              quantity = Number(quantity);

              if (quantity) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                message: 'Field must not be empty'
              }));

            case 6:
              _context4.next = 8;
              return Order.findOne({
                where: {
                  id: id
                }
              });

            case 8:
              findId = _context4.sent;

              if (findId) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", res.status(403).json({
                message: 'Error, No such order'
              }));

            case 11:
              _context4.next = 13;
              return _helper["default"].checkProduct(findId.product_id);

            case 13:
              findMenu = _context4.sent;
              _context4.next = 16;
              return Order.update({
                quantity: quantity,
                amount: quantity * findMenu.price
              }, {
                returning: true,
                where: {
                  id: id
                }
              });

            case 16:
              data = _context4.sent;
              return _context4.abrupt("return", res.status(200).json({
                TYPE: 'PUT',
                status: 'success',
                message: 'Order updated successfully',
                data: data[1][0]
              }));

            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](2);
              res.status(400).json({
                status: 'error',
                message: _context4.t0.message
              });

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 20]]);
    }))();
  },
  getUserHistory: function getUserHistory(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var id, rows, data, i, row, product;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.prev = 1;
              _context5.next = 4;
              return Order.findAll({
                where: {
                  user_id: id
                }
              });

            case 4:
              rows = _context5.sent;

              if (rows) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                message: 'Cart is empty'
              }));

            case 7:
              data = [];
              i = 0;

            case 9:
              if (!(i < rows.length)) {
                _context5.next = 18;
                break;
              }

              row = rows[i].dataValues;
              _context5.next = 13;
              return _helper["default"].checkProduct(row.product_id);

            case 13:
              product = _context5.sent;
              data.push(Object.assign(row, {
                product: product
              }));

            case 15:
              i++;
              _context5.next = 9;
              break;

            case 18:
              return _context5.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                status: 'success',
                message: 'Request successful',
                data: data
              }));

            case 21:
              _context5.prev = 21;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(500).json({
                status: 'error',
                message: _context5.t0.message
              }));

            case 24:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 21]]);
    }))();
  },
  deleteOrder: function deleteOrder(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var id, findId;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = req.params.id;
              _context6.prev = 1;
              _context6.next = 4;
              return Order.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              findId = _context6.sent;

              if (findId) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", res.status(403).json({
                message: 'Error, No such order'
              }));

            case 7:
              _context6.next = 9;
              return Order.destroy({
                where: {
                  id: id
                }
              });

            case 9:
              return _context6.abrupt("return", res.status(200).json({
                TYPE: 'DELETE',
                status: 200,
                message: 'Order Deleted successfully'
              }));

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](1);
              res.status(400).json({
                message: _context6.t0
              });

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 12]]);
    }))();
  }
};
exports["default"] = _default;