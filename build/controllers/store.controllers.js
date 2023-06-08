"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _uploadImages = _interopRequireDefault(require("../config/cloudinary/uploadImages.js"));
var _encryptPassword = _interopRequireDefault(require("../config/bcryptjs/encryptPassword.js"));
var _emailCreateUsers = _interopRequireDefault(require("../config/email/emailCreateUsers.js"));
var _dataBase = _interopRequireDefault(require("../config/dataBase/dataBase.js"));
var _password = _interopRequireDefault(require("../helper/password.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var controllerStore = {};
controllerStore.postStore = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, nameEmployee, emailEmployee, nameStore, location, passwordStore, passwordHast, emailStore, emailAdmin;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.body.data.idEmploado ? req.body.data.idEmploado : null;
          nameEmployee = req.body.data.nombreEmpleado ? req.body.data.nombreEmpleado : null;
          emailEmployee = req.body.data.email ? req.body.data.email : null;
          nameStore = req.body.data.nameStore ? req.body.data.nameStore : null;
          location = req.body.data.ubicacion ? req.body.data.ubicacion : null;
          passwordStore = _password["default"].cretaePassword();
          _context3.next = 9;
          return _encryptPassword["default"].encryptPassword(passwordStore);
        case 9:
          passwordHast = _context3.sent;
          emailStore = nameStore.replace(/\s+/g, '_') + '_' + location.replace(/\s+/g, '_') + '@flash.com';
          emailAdmin = req.user.emailUser;
          _dataBase["default"].query("SELECT id_admin FROM administrator WHERE email_admin = ?", [emailAdmin], function (err, rows) {
            if (!err && rows.length > 0) {
              var idAdmin = rows[0].id_admin;
              _dataBase["default"].query("INSERT INTO store SET ? ", {
                name_store: nameStore,
                location_store: location,
                email_store: emailStore,
                password_store: passwordHast,
                rol: 'empleado',
                id_admin: idAdmin
              }, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(err, rows) {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        if (err) {
                          _context2.next = 4;
                          break;
                        }
                        _dataBase["default"].query("SELECT id_store FROM store WHERE email_store = ?", [emailStore], function (err, rows) {
                          if (!err && rows.length > 0) {
                            var idStore = rows[0].id_store;
                            _dataBase["default"].query("INSERT INTO employee SET ?", {
                              name_employee: nameEmployee,
                              email_employee: emailEmployee,
                              state_employee: 'asset',
                              id_store: idStore
                            }, /*#__PURE__*/function () {
                              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(err, rows) {
                                var sendEmail;
                                return _regeneratorRuntime().wrap(function _callee$(_context) {
                                  while (1) switch (_context.prev = _context.next) {
                                    case 0:
                                      if (err) {
                                        _context.next = 8;
                                        break;
                                      }
                                      _context.next = 3;
                                      return _emailCreateUsers["default"].createStore(emailEmployee, nameEmployee, nameStore, emailStore, passwordStore);
                                    case 3:
                                      sendEmail = _context.sent;
                                      console.log(sendEmail);
                                      return _context.abrupt("return", res.status(200).send({
                                        mensaje: "Tienda registrada con exito."
                                      }));
                                    case 8:
                                      return _context.abrupt("return", res.status(202).send({
                                        mensaje: "Error al registrar la tienda el empleado ya existe.",
                                        error: err
                                      }));
                                    case 9:
                                    case "end":
                                      return _context.stop();
                                  }
                                }, _callee);
                              }));
                              return function (_x5, _x6) {
                                return _ref3.apply(this, arguments);
                              };
                            }());
                          } else {
                            return res.status(202).send({
                              mensaje: "Error"
                            });
                          }
                        });
                        _context2.next = 5;
                        break;
                      case 4:
                        return _context2.abrupt("return", res.status(202).send({
                          mensaje: "Error al registrar la tienda."
                        }));
                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());
            } else {
              return res.status(202).send({
                mensaje: "Error al obtener el administrador"
              });
            }
          });
          _context3.next = 18;
          break;
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            mensaje: "Ocurrio un error"
          }));
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 15]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
controllerStore.getStore = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var code, idStore;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          code = req.params.code;
          idStore = req.params.idStore;
          if (idStore == 0) {
            _dataBase["default"].query("SELECT * FROM store where id_admin = ? limit 10 ", [code], function (err, rows) {
              if (rows) {
                return res.status("200").send({
                  mensaje: "Tiendas obtenidas",
                  data: rows
                });
              } else {
                return res.status("202").send({
                  mensaje: "Error al mostrar local",
                  err: err
                });
              }
            });
          } else {
            _dataBase["default"].query("SELECT * FROM store where id_admin = ? ", [code], function (err, rows) {
              if (rows) {
                var data = rows;
                _dataBase["default"].query("SELECT * FROM product WHERE id_store = ?", [idStore], function (err, rows) {
                  if (rows) {
                    return res.status("200").send({
                      mensaje: "Tiendas obtenidas",
                      data: data,
                      product: rows
                    });
                  } else {
                    return res.status("202").send({
                      mensaje: "Error al mostrar local",
                      err: err
                    });
                  }
                });
              } else {
                return res.status("202").send({
                  mensaje: "Error al mostrar local",
                  err: err
                });
              }
            });
          }
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
controllerStore.getStores = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var limit;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          limit = req.params.limit;
          console.log(limit);
          if (limit == 0) {
            _dataBase["default"].query("SELECT * FROM store", function (err, rows) {
              if (rows) {
                return res.status("200").send({
                  mensaje: "Tiendas obtenidas",
                  data: rows
                });
              } else {
                return res.status("202").send({
                  mensaje: "Error al mostrar local",
                  err: err
                });
              }
            });
          } else {
            _dataBase["default"].query("SELECT * FROM store limit ".concat(limit), function (err, rows) {
              if (rows) {
                return res.status("200").send({
                  mensaje: "Tiendas obtenidas",
                  data: rows
                });
              } else {
                return res.status("202").send({
                  mensaje: "Error al mostrar local",
                  err: err
                });
              }
            });
          }
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
controllerStore.getDataStore = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _dataBase["default"].query("SELECT * FROM store WHERE email_store = ?", [req.user.emailUser], function (err, rows) {
            if (rows.length > 0) {
              console.log(rows);
              return res.status("200").send({
                mensaje: "Tiendas obtenidas",
                data: rows
              });
            } else {
              return res.status("202").send({
                mensaje: "Error al mostrar local",
                err: err
              });
            }
          });
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
controllerStore.getStoreAdmin = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var email;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          email = req.user.emailUser ? req.user.emailUser : null;
          _dataBase["default"].query("SELECT id_admin FROM administrator WHERE email_admin = ?", [email], function (err, rows) {
            if (!err && rows.length > 0) {
              var id = rows[0].id_admin;
              _dataBase["default"].query("SELECT e.name_employee, e.email_employee, e.state_employee , s.name_store, s.id_store, s.location_store, s.email_store FROM employee e INNER JOIN store s ON e.id_store = s.id_store WHERE e.id_store IN (SELECT id_store FROM store WHERE id_admin = ?)", [id], function (err, rows) {
                if (!err && rows.length > 0) {
                  return res.status(200).send({
                    mensaje: "Locales obtenidos",
                    data: rows
                  });
                } else {
                  return res.status(202).send({
                    mensaje: "Error al obtener los locales",
                    error: err
                  });
                }
              });
            } else {
              return res.status(202).send({
                mensaje: "Error al obtener el administrador"
              });
            }
          });
          _context7.next = 8;
          break;
        case 5:
          _context7.prev = 5;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(500).send({
            mensaje: "Ocurrio un error"
          }));
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 5]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
controllerStore.putStore = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var emailStore, nameStore, phone, description, image, photo, urlPhoto, idPhoto;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          emailStore = req.user.emailUser;
          nameStore = req.body['data[name]'] ? req.body['data[name]'] : null;
          phone = req.body['data[phone]'] ? req.body['data[phone]'] : null;
          console.log(phone);
          description = req.body['data[description]'] ? req.body['data[description]'] : null;
          image = null;
          if (req.files != null) {
            image = req.files.data.tempFilePath ? req.files.data.tempFilePath : null;
          }
          if (!(image != null)) {
            _context8.next = 13;
            break;
          }
          _context8.next = 10;
          return _uploadImages["default"].uploadImagesStore(image, nameStore);
        case 10:
          _context8.t0 = _context8.sent;
          _context8.next = 14;
          break;
        case 13:
          _context8.t0 = null;
        case 14:
          photo = _context8.t0;
          urlPhoto = photo != null ? photo.secure_url : null;
          idPhoto = photo != null ? photo.public_id : null;
          _dataBase["default"].query("SELECT * FROM store WHERE email_store = ?", [emailStore], function (err, rows) {
            if (!err && rows.length > 0) {
              var nameDB = nameStore != null ? nameStore : rows[0].name_store;
              var phoneDB = phone != null ? phone : rows[0].phone_number_store;
              console.log("phoneDB", phoneDB);
              var descriptionDB = description != null ? description : rows[0].description_store;
              var imageDB = urlPhoto != null ? urlPhoto : rows[0].img_store;
              var idPhotoDB = idPhoto != null ? idPhoto : rows[0].id_img_store;
              _dataBase["default"].query("UPDATE store SET name_store = ?, phone_number_store = ?, description_store = ?, img_store = ?, id_img_store = ? WHERE email_store = ?", [nameDB, phoneDB, descriptionDB, imageDB, idPhotoDB, emailStore], function (err, rows) {
                console.log("erro", err);
                if (!err && rows.affectedRows) {
                  return res.status(200).send({
                    mensaje: "Local actualizado con exito",
                    rows: rows
                  });
                } else {
                  return res.status(202).send({
                    mensaje: "Error al actualizar el local",
                    error: err
                  });
                }
              });
            }
          });
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
controllerStore.deleteStore = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var code;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          code = req.params.code ? req.params.code : null;
          console.log(code);
          _dataBase["default"].query("SELECT email_employee FROM employee WHERE id_store = ?", [code], function (err, rows) {
            console.log("Correo", rows);
            if (rows.length > 0) {
              var email = rows[0].email_employee;
              console.log(email);
              _dataBase["default"].query("DELETE FROM employee WHERE email_employee = ?", [email], function (err, rows) {
                if (!err) {
                  _dataBase["default"].query("DELETE FROM store WHERE id_store = ?", [code], function (err, rows) {
                    if (!err) {
                      return res.status(200).send({
                        mensaje: "Local eliminado junto con el empleado."
                      });
                    } else {
                      return res.status(500).send({
                        mensaje: "Ocurrio unor",
                        err: err
                      });
                    }
                  });
                } else {
                  console.log(err);
                  return res.status(500).send({
                    mensaje: "Ocurri",
                    err: err
                  });
                }
              });
            } else {
              return res.status(403).send({
                mensaje: "No se puede eliminar el local porque tiene empleados"
              });
            }
          });
          _context9.next = 9;
          break;
        case 6:
          _context9.prev = 6;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", res.status(500).send({
            mensaje: "Ocurrio un error"
          }));
        case 9:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 6]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var _default = controllerStore;
exports["default"] = _default;