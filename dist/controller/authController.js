"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = _db["default"].User;
var _default = {
  signup: function () {
    var _signup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$value$body, firstName, lastName, email, password, checkEmail, hash, user, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$value$body = req.value.body, firstName = _req$value$body.firstName, lastName = _req$value$body.lastName, email = _req$value$body.email, password = _req$value$body.password;
              _context.prev = 1;
              email = email.toLowerCase().trim();
              _context.next = 5;
              return _helper["default"].existEmail(email);

            case 5:
              checkEmail = _context.sent;

              if (!checkEmail) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(403).json({
                message: 'Email already exist'
              }));

            case 8:
              _context.next = 10;
              return _helper["default"].hashPassword(password);

            case 10:
              hash = _context.sent;
              _context.next = 13;
              return User.create({
                id: (0, _v["default"])(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                isAdmin: false
              });

            case 13:
              user = _context.sent;
              _context.next = 16;
              return _helper["default"].genToken(user);

            case 16:
              token = _context.sent;
              _context.next = 19;
              return res.status(201).json({
                status: 'success',
                type: 'POST',
                data: user,
                token: "Bearer ".concat(token),
                message: 'Registered successfully'
              });

            case 19:
              return _context.abrupt("return", _context.sent);

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", res.status(500).json({
                status: 'error',
                message: _context.t0.message
              }));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 22]]);
    }));

    function signup(_x, _x2) {
      return _signup.apply(this, arguments);
    }

    return signup;
  }(),
  signin: function () {
    var _signin = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var user, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = req.user; // gen token

              token = _helper["default"].genToken(user);
              res.status(200).json({
                type: 'POST',
                status: 'success',
                data: user,
                token: "Bearer ".concat(token),
                message: "You've successfully signed in"
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function signin(_x3, _x4) {
      return _signin.apply(this, arguments);
    }

    return signin;
  }(),
  secret: function secret(req, res) {
    res.status(200).json({
      type: 'GET',
      status: 'success',
      data: req.user,
      secret: 'resource'
    });
  }
};
exports["default"] = _default;