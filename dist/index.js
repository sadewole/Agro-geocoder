"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

require("regenerator-runtime/runtime");

var _cors = _interopRequireDefault(require("cors"));

var _authRoute = _interopRequireDefault(require("./router/api/authRoute"));

var _userRoute = _interopRequireDefault(require("./router/api/userRoute"));

var _productRoute = _interopRequireDefault(require("./router/api/productRoute"));

var _orderRoute = _interopRequireDefault(require("./router/api/orderRoute"));

require("dotenv/config");

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // middlewares

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use('/api/v1/auth', _authRoute["default"]);
app.use('/api/v1/user', _userRoute["default"]);
app.use('/api/v1/product', _productRoute["default"]);
app.use('/api/v1/order', _orderRoute["default"]);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }

  next();
});
app.use(function (err, req, res, next) {
  var error = app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    error: {
      message: error.message
    }
  });
});
var PORT = process.env.PORT || 5000; // sync database

_db["default"].sequelize.sync().then(function () {
  console.log('Connection has been established successfully.');
}).then(function () {
  // listen to server
  app.listen(PORT, '0.0.0.0', console.log("Server running on ".concat(PORT)));
});