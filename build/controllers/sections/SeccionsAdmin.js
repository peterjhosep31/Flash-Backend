"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _dataBase = _interopRequireDefault(require("../../config/dataBase/dataBase.js"));
var _email = _interopRequireDefault(require("../../config/email/email.js"));
var _generateToken = _interopRequireDefault(require("../../config/accessToken/generateToken.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
_dotenv["default"].config();
var controllerSesionAdmin = {};
controllerSesionAdmin.Login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var email, password, token;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          _context.next = 4;
          return (0, _generateToken["default"])(email, password);
        case 4:
          token = _context.sent;
          _dataBase["default"].query("SELECT password_admin FROM administrator WHERE email_admin = ?", [email], function (err, rows) {
            if (err) {
              return res.status("202").send({
                mensaje: "Error al iniciar sesión",
                error: err
              });
            } else {
              if (rows.length > 0) {
                var passwordDB = rows[0].password_admin;
                var passwordCompare = _bcryptjs["default"].compareSync(password, passwordDB);
                if (passwordCompare) {
                  return res.status("200").send({
                    mensaje: "Inicio de sesión exitoso hgftyyu",
                    keyToken: token
                  });
                } else {
                  return res.status("202").send({
                    mensaje: "Contraseña incorrecta"
                  });
                }
              } else {
                return res.status("202").send({
                  mensaje: "El correo ingresado no existe"
                });
              }
            }
          });
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
controllerSesionAdmin.UpdateDataStaff = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var idUser, nameUser, phoneUser, emailUser, photoAdmin, idPhoto;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          idUser = req.body.document;
          nameUser = req.body.name;
          phoneUser = req.body.phone;
          emailUser = req.body.email;
          photoAdmin = null;
          idPhoto = null;
          _dataBase["default"].query("UPDATE administrator SET ? WHERE id_admin = ?", [{
            name_admin: nameUser,
            email_admin: emailUser,
            phone_number_admin: phoneUser,
            img_admin: photoAdmin,
            id_img_admin: idPhoto
          }, idUser], function (err, rows) {
            if (err) {
              return res.status("202").send({
                mensaje: "Error al actualizar los datos del usuario",
                error: err
              });
            } else {
              return res.status("200").send({
                mensaje: "Datos del usuario actualizados con exito"
              });
            }
          });
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
controllerSesionAdmin.UpdatePhotoStaff = function (req, res) {
  var idUser = req.body.document;
  var urlPhoto = null;
  var idPhoto = null;
  _dataBase["default"].query("UPDATE administrator SET ? WHERE id_admin = ?", [{
    img_admin: urlPhoto,
    id_img_admin: idPhoto
  }, idUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al actualizar la foto del usuario",
        error: err
      });
    } else {
      return res.status("200").send({
        mensaje: "Foto del usuario actualizada con exito"
      });
    }
  });
};
controllerSesionAdmin.RecoverPassword = function (req, res) {
  var email = req.body.email;
  var codeRecoverPassword = Math.floor(Math.random() * 1000000);
  var passwordHash = _bcryptjs["default"].hash(codeRecoverPassword, 10);
  _dataBase["default"].query("UPDATE administrator SET ? WHERE email_admin = ?", [{
    code_recover_password: passwordHash,
    password_admin: codeRecoverPassword
  }, email], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al recuperar la contraseña",
        error: err
      });
    } else {
      _email["default"].sendMail({
        from: "2022.flash.sale@gmail.com",
        to: email,
        subject: "Recuperación de contraseña",
        html: "<h1>Recuperaci\xF3n de contrase\xF1a</h1>\n                <p>El c\xF3digo de recuperaci\xF3n de contrase\xF1a es: ".concat(codeRecoverPassword, "</p>\n                <p>Si no solicit\xF3 recuperar su contrase\xF1a, por favor ignore este correo.</p>\n                <p>Gracias por preferirnos.</p>\n                ")
      }.then(function (res) {
        return console.log("Correo enviado");
      })["catch"](function (err) {
        return console.log("_________ERROR AL ENVIAR EL MAIL _________\n", err, "\n__________________________________");
      }));
      return res.status("200").send({
        mensaje: "Correo enviado con exito"
      });
    }
  });
};
controllerSesionAdmin.UpdatePassword = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var newPassword = req.body.newPassword;
  var newpasswordHash = _bcryptjs["default"].hash(newPassword, 10);
  _dataBase["default"].query("SELECT password_admin FROM administrator WHERE email_admin = ?", [email], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al actualizar la contraseña",
        error: err
      });
    } else {
      if (rows.length > 0) {
        var passwordHash = rows[0].password_admin;
        _bcryptjs["default"].compare(password, passwordHash, function (err, result) {
          if (result) {
            _dataBase["default"].query("UPDATE administrator SET ? WHERE email_admin = ?", [{
              password_admin: newpasswordHash
            }, email], function (err, rows) {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al actualizar la contraseña",
                  error: err
                });
              } else {
                return res.status("200").send({
                  mensaje: "Contraseña actualizada con exito"
                });
              }
            });
          } else {
            return res.status("202").send({
              mensaje: "Error al actualizar la contraseña, contraseña incorrecta",
              error: err
            });
          }
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al actualizar la contraseña, el usuario no existe",
          error: err
        });
      }
    }
  });
};
controllerSesionAdmin.ListDataAdmin = function (req, res) {
  var idUser = req.body.document;
  _dataBase["default"].query("SELECT * FROM administrator WHERE id_admin = ?", [idUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al listar los datos del usuario",
        error: err
      });
    } else {
      return res.status("200").send({
        mensaje: "Datos del usuario listados con exito",
        data: rows
      });
    }
  });
};
controllerSesionAdmin.updateEmailAdmin = function (req, res) {
  var idAdmin = req.body.document;
  var newEmailAdmin = req.body.email;
  _dataBase["default"].query("SELECT id_admin FROM administrator WHERE id_admin = ?", [idAdmin], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al actualizar el email del usuario",
        error: err
      });
    } else {
      var idAdminDB = rows[0].id_admin;
      if (idAdminDB == idAdmin) {
        _dataBase["default"].query("UPDATE administrator SET ? WHERE id_admin = ?", [{
          email_admin: newEmailAdmin
        }, idAdmin], function (err, rows) {
          if (err) {
            return res.status("202").send({
              mensaje: "Error al actualizar el email del usuario",
              error: err
            });
          } else {
            return res.status("200").send({
              mensaje: "Email del usuario actualizado con exito"
            });
          }
        });
      }
    }
  });
};
var _default = controllerSesionAdmin;
exports["default"] = _default;