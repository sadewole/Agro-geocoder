"use strict";

var _passportJwt = require("passport-jwt");

var _passportLocal = require("passport-local");

var _passport = _interopRequireDefault(require("passport"));

var _helper = _interopRequireDefault(require("./middlewares/helper"));

var _db = _interopRequireDefault(require("./db"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = _db["default"].User; // init passport JWTStrategy

_passport["default"].use('jwt', new _passportJwt.Strategy({
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(payload, done) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.findOne({
              where: {
                id: payload.sub
              }
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 6:
            return _context.abrupt("return", done(null, user));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            done(_context.t0, null, _context.t0.message);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}())); // init passport localStrategy


_passport["default"].use('local', new _passportLocal.Strategy({
  usernameField: 'email'
},
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(email, password, done) {
    var user, comparePassword;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // confirm email
            email = email.toLowerCase().trim();
            _context2.next = 4;
            return _helper["default"].existEmail(email);

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", done(null, false));

          case 7:
            _context2.next = 9;
            return _helper["default"].comparePassword(password, user.password);

          case 9:
            comparePassword = _context2.sent;

            if (comparePassword) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", done(null, false));

          case 12:
            return _context2.abrupt("return", done(null, user));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", done(_context2.t0, null, _context2.t0.message));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()));