"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

var _cloudinaryConfig = _interopRequireDefault(require("../middlewares/cloudinaryConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Product = _db["default"].Product;
var _default = {
  getAllProduct: function getAllProduct(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Product.findAll({});

            case 3:
              data = _context.sent;

              if (!(data.length < 1)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(200).json({
                message: 'Product catalog is empty.'
              }));

            case 6:
              res.status(200).json({
                status: 'success',
                TYPE: 'GET',
                count: data.length,
                message: 'List of foods in cart',
                data: data
              });
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                status: 'error',
                message: _context.t0.message
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }))();
  },
  createProduct: function createProduct(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _req$body, name, price, description, category, image, returnImage, data;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, price = _req$body.price, description = _req$body.description, category = _req$body.category;
              _context2.prev = 1;

              if (!(req.user.isAdmin !== true)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                message: 'Unauthorised'
              }));

            case 4:
              price = parseFloat(price);

              if (!(!name || !price || !description || !category)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                message: 'Field(s) is not allowed to be empty'
              }));

            case 7:
              image = null;

              if (!req.file) {
                image = req.imagepath;
              } else {
                image = req.file.path;
              }

              _context2.next = 11;
              return _cloudinaryConfig["default"].v2.uploader.upload(image);

            case 11:
              returnImage = _context2.sent;
              _context2.next = 14;
              return Product.create({
                id: (0, _v["default"])(),
                name: name,
                price: price,
                description: description,
                category: category,
                inStock: true,
                image: returnImage.secure_url
              });

            case 14:
              data = _context2.sent;
              return _context2.abrupt("return", res.status(201).json({
                TYPE: 'POST',
                status: 'success',
                message: 'Food added successfully',
                data: data
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](1);
              res.status(500).json({
                status: 'error',
                message: _context2.t0.message
              });

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 18]]);
    }))();
  },
  getSingleProduct: function getSingleProduct(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var id, data;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return Product.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              data = _context3.sent;

              if (data) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                message: 'Product Not Found'
              }));

            case 7:
              return _context3.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                status: 'success',
                message: 'Request successful',
                data: data
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              res.status(500).json({
                status: 'error',
                message: _context3.t0.message
              });

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }))();
  },
  updateProduct: function updateProduct(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var id, image, returnImage, data;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              _context4.prev = 1;

              if (!(req.user.isAdmin !== true)) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return", res.status(401).json({
                message: 'Unauthorised'
              }));

            case 4:
              image = null;

              if (!req.file) {
                image = req.imagepath;
              } else {
                image = req.file.path;
              }

              _context4.next = 8;
              return _cloudinaryConfig["default"].uploader.upload(image);

            case 8:
              returnImage = _context4.sent;
              _context4.next = 11;
              return Product.update({
                name: req.body.name,
                price: parseFloat(req.body.price),
                description: req.body.desscription,
                category: req.body.category,
                inStock: req.body.inStock,
                image: returnImage.secure_url
              }, {
                returning: true,
                where: {
                  id: id
                }
              });

            case 11:
              data = _context4.sent;
              console.log(data);
              return _context4.abrupt("return", res.status(201).json({
                TYPE: 'PUT',
                status: 'success',
                message: 'Food updated successfully',
                data: data[1][0]
              }));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](1);
              res.status(500).json({
                status: 'error',
                message: _context4.t0.message
              });

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 16]]);
    }))();
  },
  deleteProduct: function deleteProduct(req, res) {
    return _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var id, findId;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.prev = 1;

              if (!(req.user.isAdmin !== true)) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", res.status(401).json({
                message: 'Unauthorised'
              }));

            case 4:
              _context5.next = 6;
              return Product.findOne({
                where: {
                  id: id
                }
              });

            case 6:
              findId = _context5.sent;

              if (findId) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", res.status(403).json({
                message: 'Unknown request'
              }));

            case 9:
              _context5.next = 11;
              return Product.destroy({
                where: {
                  id: id
                }
              });

            case 11:
              return _context5.abrupt("return", res.status(200).json({
                TYPE: 'DELETE',
                status: 'success',
                message: 'Food Deleted successfully'
              }));

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](1);
              res.status(500).json({
                status: 'error',
                message: _context5.t0.message
              });

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 14]]);
    }))();
  }
};
exports["default"] = _default;