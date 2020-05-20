"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = _db["default"].User;
var _default = {
  getAllUser: function getAllUser(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var user;
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
              return User.findAll({});

            case 5:
              user = _context.sent;

              if (!(user.length < 1)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(200).json({
                message: 'No User yet'
              }));

            case 8:
              return _context.abrupt("return", res.status(200).json({
                type: 'GET',
                status: 'success',
                message: 'Request successfully',
                data: user
              }));

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                status: 'error',
                message: _context.t0.message
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }))();
  },
  getSingleUser: function getSingleUser(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var id, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return User.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              user = _context2.sent;

              if (user) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                message: 'User doesn\'t exist'
              }));

            case 7:
              return _context2.abrupt("return", res.status(200).json({
                type: 'GET',
                status: 'success',
                message: 'Request successfully',
                data: user
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(500).json({
                success: false,
                message: _context2.t0.message
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }))();
  },
  deleteUser: function deleteUser(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var id, user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.prev = 1;

              if (!(req.user.isAdmin !== true)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", res.status(401).json({
                message: 'Unauthorised'
              }));

            case 4:
              _context3.next = 6;
              return User.findOne({
                where: {
                  id: id
                }
              });

            case 6:
              user = _context3.sent;

              if (user) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(403).json({
                message: 'Bad request'
              }));

            case 9:
              _context3.next = 11;
              return User.destroy({
                where: {
                  id: id
                }
              });

            case 11:
              return _context3.abrupt("return", res.status(200).json({
                type: 'DELETE',
                status: 'success',
                message: 'Deleted successfully'
              }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);
              return _context3.abrupt("return", res.status(500).json({
                success: false,
                message: _context3.t0.message
              }));

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 14]]);
    }))();
  }
};
exports["default"] = _default;