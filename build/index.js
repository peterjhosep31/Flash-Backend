"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _routes = _interopRequireDefault(require("./routes/routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
_dotenv["default"].config();
app.use(_routes["default"]);
app.set("port", process.env.PORT_SERVER || 3000);
app.use(_express["default"].json());
app.listen(app.set("port"), function () {
  console.log("✔️✔️   Server on port", app.set("port"), "❗");
});

// export default myConnectionDataBase;