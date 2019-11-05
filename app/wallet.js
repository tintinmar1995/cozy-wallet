/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "/wallet.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "/KVF":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": "7dT6",
	"./en.json": "7dT6"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "/KVF";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("201c");
__webpack_require__("7NIr");
module.exports = __webpack_require__("LiWt");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2E0U":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("R52o");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TODOS_DOCTYPE", function() { return _todos__WEBPACK_IMPORTED_MODULE_0__["TODOS_DOCTYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "todosQuery", function() { return _todos__WEBPACK_IMPORTED_MODULE_0__["todosQuery"]; });

 // the documents schema, necessary for CozyClient

/* harmony default export */ __webpack_exports__["default"] = ({
  todos: {
    doctype: _todos__WEBPACK_IMPORTED_MODULE_0__["TODOS_DOCTYPE"],
    attributes: {},
    relationships: {}
  } // export all doctypes for the application

});


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "6boQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewCard", function() { return NewCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("j4rC");


var NewCard = function NewCard() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditCard__WEBPACK_IMPORTED_MODULE_1__["default"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (NewCard);

/***/ }),

/***/ "7WNl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletsViewer", function() { return WalletsViewer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MyWallets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Fc/d");


var WalletsViewer = function WalletsViewer() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MyWallets__WEBPACK_IMPORTED_MODULE_1__["default"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (WalletsViewer);

/***/ }),

/***/ "7dT6":
/***/ (function(module) {

module.exports = JSON.parse("{\"Nav\":{\"wallet\":\"My wallets\",\"add_card\":\"Add card\"}}");

/***/ }),

/***/ "81BL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return Wallet; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("NpuA");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rQTU");
/* harmony import */ var cozy_ui_transpiled_react_MuiCozyTheme_Buttons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("3r7G");
/* harmony import */ var _material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Betk");
/* harmony import */ var _material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("Tp5u");
/* harmony import */ var _material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("rD/X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_8__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








 // Compare is used to sort cards in a wallet

function compare(a, b) {
  if (a.store < b.store) {
    return -1;
  }

  if (a.store > b.store) {
    return 1;
  }

  return 0;
}

var Wallet =
/*#__PURE__*/
function (_Component) {
  _inherits(Wallet, _Component);

  function Wallet(props, context) {
    var _this;

    _classCallCheck(this, Wallet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wallet).call(this, props, context)); // initial component state

    _defineProperty(_assertThisInitialized(_this), "loadCards",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      var _this$props, client, id;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$props = _this.props, client = _this$props.client, id = _this$props.id; // Get Wallet's name

              _context3.next = 3;
              return client.stackClient.fetchJSON('GET', '/files/' + id).then(
              /*#__PURE__*/
              function () {
                var _ref2 = _asyncToGenerator(
                /*#__PURE__*/
                _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(response) {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          try {
                            _this.setState({
                              name: response.data.attributes.name
                            });
                          } catch (err) {
                            alert(err);
                          }

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 3:
              _context3.next = 5;
              return client.stackClient.fetchJSON('GET', '/files/download/' + id).then(
              /*#__PURE__*/
              function () {
                var _ref3 = _asyncToGenerator(
                /*#__PURE__*/
                _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(response) {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          try {
                            _this.setState({
                              csvFile: response
                            });

                            papaparse__WEBPACK_IMPORTED_MODULE_2___default.a.parse(response, {
                              complete: _this.updateData,
                              header: true
                            });
                          } catch (err) {
                            alert(err);
                          }

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }());

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    _defineProperty(_assertThisInitialized(_this), "updateData", function (result) {
      var data = result.data;

      _this.setState({
        data: data,
        isEmpty: data.length == 0 || data.length == 1 && !data[0].store
      });
    });

    _this.state = {
      boolLoading: true,
      csvFile: '',
      name: '',
      isEmpty: false,
      data: []
    };

    _this.loadCards();

    return _this;
  } // load cards from csv file


  _createClass(Wallet, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          data = _this$state.data,
          isEmpty = _this$state.isEmpty;

      if (!isEmpty) {
        // Sort card by store
        data.sort(compare);
        var out = [];

        for (var i = 0; i < data.length; i++) {
          out.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
            id: i,
            card: data[i],
            onClick:
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(i) {
                var _this2$props, client, id, newFile, res;

                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _this2$props = _this2.props, client = _this2$props.client, id = _this2$props.id; // Deleting the card from the array of card

                        _this2.state.data.splice(i, 1); // Converting the array to a CSV file


                        newFile = papaparse__WEBPACK_IMPORTED_MODULE_2___default.a.unparse(_this2.state.data); // Clean card and prevent from empty lines

                        newFile = newFile.split(',,,,,,\r\n').join('').split(',,,,,,').join(''); // Update the file in Cozy Drive

                        _context4.next = 6;
                        return client.stackClient.fetchJSON('PUT', '/files/' + id, newFile).then(function (response) {
                          return response;
                        }).catch(function (error) {
                          alert(error);
                        });

                      case 6:
                        res = _context4.sent;

                        _this2.setState({
                          boolModal: false
                        });

                      case 8:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x3) {
                return _ref4.apply(this, arguments);
              };
            }()
          }));
        }

        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_5__["default"], {
          style: {
            marginRight: '50px'
          }
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_6__["default"], null, this.state.name.replace('.csv', '')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_7__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, out)));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_5__["default"], {
          style: {
            marginRight: '50px'
          }
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_6__["default"], null, this.state.name.replace('.csv', '')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_7__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_MuiCozyTheme_Buttons__WEBPACK_IMPORTED_MODULE_4__["default"], {
          variant: "contained",
          className: "u-m-1",
          icon: "trash",
          theme: "danger",
          onClick: function onClick() {
            var _this2$props2 = _this2.props,
                client = _this2$props2.client,
                id = _this2$props2.id;
            client.stackClient.fetchJSON('DELETE', '/files/' + id).catch(function (error) {
              alert(error);
            });
          }
        }, "Delete")));
      }
    }
  }]);

  return Wallet;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_8__["withClient"])(Wallet));

/***/ }),

/***/ "Fc/d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyWallets", function() { return MyWallets; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Wallet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("81BL");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_transpiled_react_MuiCozyTheme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("xIbs");
/* harmony import */ var cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_transpiled_react_Input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("zA8p");
/* harmony import */ var cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("GoJ1");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var MyWallets =
/*#__PURE__*/
function (_Component) {
  _inherits(MyWallets, _Component);

  function MyWallets(props, context) {
    var _this;

    _classCallCheck(this, MyWallets);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MyWallets).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "loadWalletsId",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var ids, client;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ids = {
                dirId: '',
                filesId: []
              };
              client = _this.props.client; // Get the id of the folder "My Wallets", and the content's id

              _context.prev = 2;
              _context.next = 5;
              return client.stackClient.fetchJSON('GET', '/files/metadata?Path=/My%20Wallets').then(function (response) {
                return {
                  dirId: response.data.id,
                  filesId: response.data.relationships.contents.data
                };
              });

            case 5:
              ids = _context.sent;
              _context.next = 13;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              _context.next = 12;
              return client.stackClient.fetchJSON('POST', '/files/?Type=directory&Name=My%20Wallets').then(function (response) {
                return {
                  dirId: response.data.id,
                  filesId: []
                };
              }).catch(function (error) {
                alert(error);
              });

            case 12:
              ids = _context.sent;

            case 13:
              _this.setState({
                dirId: ids.dirId,
                filesId: ids.filesId
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "newWallet",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var client, filesId, response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              client = _this.props.client;
              filesId = _this.state.filesId; // Create dummy file

              _context2.next = 4;
              return client.stackClient.fetchJSON('POST', '/files/' + _this.state.dirId + '?Type=file&Name=' + _this.state.newWalletName + '.csv', '_id,store,note,cardid,headercolor,headertextcolor,barcodetype\r\n1,Exemple,This is a note,2070253157477,-5414233,-1,EAN_13\r\n').catch(function (error) {
                alert(error);
              });

            case 4:
              response = _context2.sent;
              filesId.push({
                type: 'io.cozy.files',
                id: response.data.id,
                fake: 'news'
              });

              _this.setState({
                creatingWallet: false,
                filesId: filesId,
                newWalletName: ''
              });

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _this.state = {
      dirId: '',
      filesId: [],
      creatingWallet: false,
      newWalletName: ''
    };
    return _this;
  }

  _createClass(MyWallets, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var out = [];
      var creatingWallet = this.state.creatingWallet;
      out.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          margin: '20px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
        theme: "secondary",
        type: "button",
        onClick: function onClick() {
          _this2.setState({
            creatingWallet: !_this2.state.creatingWallet
          });
        },
        busy: creatingWallet,
        label: "New wallet",
        size: "large"
      }), creatingWallet && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_Input__WEBPACK_IMPORTED_MODULE_6__["default"], {
        placeholder: "Enter the name of your new wallet",
        value: this.state.newWalletName,
        onChange: function onChange(event) {
          _this2.setState({
            newWalletName: event.target.value
          });
        }
      }), creatingWallet && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
        theme: "secondary",
        label: "Create",
        onClick: this.newWallet,
        type: "button",
        size: "large"
      }), creatingWallet && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
        iconOnly: true,
        type: "button",
        theme: "secondary",
        onClick: function onClick() {
          _this2.setState({
            creatingWallet: !_this2.state.creatingWallet
          });
        },
        label: "Cancel",
        icon: "cross",
        extension: "narrow",
        size: "large"
      })))); // For each wallet, add it to the page

      for (var index = 0; index < this.state.filesId.length; index++) {
        out.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_MuiCozyTheme__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Wallet__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: this.state.filesId[index].id
        })));
      }

      if (this.state.filesId.length == 0) {
        out.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            position: 'relative',
            transform: 'translateZ(0)',
            height: '500px',
            display: 'flex'
          }
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_7__["default"], {
          icon: "cozy",
          title: "This list is empty",
          text: "Try adding some content to this list"
        })));
      }

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, out);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadWalletsId();
    }
  }]);

  return MyWallets;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_3__["withClient"])(MyWallets));

/***/ }),

/***/ "LiWt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("VxdY");
/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("buk/");
/* harmony import */ var doctypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2E0U");
/* global cozy */






var appLocale;

var renderApp = function renderApp(client) {
  var App = __webpack_require__("xYwX").default;

  Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["render"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__["I18n"], {
    lang: appLocale,
    dictRequire: function dictRequire(appLocale) {
      return __webpack_require__("/KVF")("./".concat(appLocale));
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_2__["CozyProvider"], {
    client: client
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(App, null))), document.querySelector('[role=application]'));
}; // return a defaultData if the template hasn't been replaced by cozy-stack


var getDataOrDefault = function getDataOrDefault(toTest, defaultData) {
  var templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/; // {{.Example}}

  return templateRegex.test(toTest) ? defaultData : toTest;
}; // initial rendering of the application


document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('[role=application]');
  var data = root.dataset;
  var appIcon = getDataOrDefault(data.cozyIconPath, __webpack_require__("ZAKO"));
  var appNamePrefix = getDataOrDefault(data.cozyAppNamePrefix || __webpack_require__("pZg0").name_prefix, '');
  var appName = getDataOrDefault(data.cozyAppName, __webpack_require__("pZg0").name);
  appLocale = getDataOrDefault(data.cozyLocale, 'en');
  var protocol = window.location ? window.location.protocol : 'https:'; // initialize the client to interact with the cozy stack

  var client = new cozy_client__WEBPACK_IMPORTED_MODULE_2___default.a({
    uri: "".concat(protocol, "//").concat(data.cozyDomain),
    token: data.cozyToken,
    schema: doctypes__WEBPACK_IMPORTED_MODULE_5__["default"]
  }); // initialize the bar, common of all applications, it allows
  // platform features like apps navigation without doing anything

  cozy.bar.init({
    appName: appName,
    appNamePrefix: appNamePrefix,
    iconPath: appIcon,
    lang: appLocale,
    replaceTitleOnMobile: true
  });
  renderApp(client);
});

/***/ }),

/***/ "R52o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TODOS_DOCTYPE", function() { return TODOS_DOCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "todosQuery", function() { return todosQuery; });
var TODOS_DOCTYPE = 'io.mocks.todos'; // queries for CozyClient

var todosQuery = function todosQuery(client) {
  return client.find(TODOS_DOCTYPE);
};

/***/ }),

/***/ "VxdY":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ZAKO":
/***/ (function(module, exports) {

module.exports = "/img/icon.svg";

/***/ }),

/***/ "fH6n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sidebar", function() { return Sidebar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("55Ip");




var Sidebar = function Sidebar(_ref) {
  var t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("aside", {
    className: "o-sidebar"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "c-nav"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "c-nav-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: "/wallet",
    className: "c-nav-link",
    activeClassName: "is-active"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "c-nav-icon",
    icon: "wallet"
  }), t('Nav.wallet'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "c-nav-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: "/add",
    className: "c-nav-link",
    activeClassName: "is-active"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "c-nav-icon",
    icon: "plus"
  }), t('Nav.add_card'))))));
}; // translate() provide t() to use translations (ex: locales/en.json)

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(Sidebar));

/***/ }),

/***/ "j4rC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCard", function() { return EditCard; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var react_barcode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8yty");
/* harmony import */ var react_barcode__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_barcode__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_Label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("w7SU");
/* harmony import */ var cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zA8p");
/* harmony import */ var cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("GoJ1");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("cLsY");
/* harmony import */ var cozy_ui_transpiled_react_SelectBox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("81zs");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_9__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var EditCard =
/*#__PURE__*/
function (_Component) {
  _inherits(EditCard, _Component);

  function EditCard(props, context) {
    var _this;

    _classCallCheck(this, EditCard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditCard).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "addCard",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var templateNewLine, client, newFile, res, index;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // The templateNewLine matches with the android app LoyaltyCardLocker
              // The two unreplaced attributes are colors
              templateNewLine = '[**ID**],[**STORE**],[**NOTE**],[**CARDID**],-416706,-1,[**TYPE**]\r\n';
              client = _this.props.client;
              newFile = '';
              res = ''; // Set the Save button as working

              _this.setState({
                busy: true,
                boolModal: true,
                titleModal: 'Processing',
                textModal: ''
              });

              index = 0;

            case 6:
              if (!(index < _this.state.selectedWallets.length)) {
                _context.next = 18;
                break;
              }

              _context.next = 9;
              return client.stackClient.fetchJSON('GET', '/files/download/' + _this.state.selectedWallets[index].value).then(function (response) {
                var newLine = templateNewLine.replace('[**ID**]', response.split('\n').length).replace('[**NOTE**]', _this.state.note).replace('[**STORE**]', _this.state.store).replace('[**CARDID**]', _this.state.cardid).replace('[**TYPE**]', _this.state.barcodetype);
                return response + newLine;
              }).catch(function (error) {
                alert(error);
              });

            case 9:
              newFile = _context.sent;
              // Clean the file to prevent from empty lines
              newFile = newFile.split(',,,,,,\r\n').join('').split(',,,,,,').join(''); // Update the file in Cozy's VFS

              _context.next = 13;
              return client.stackClient.fetchJSON('PUT', '/files/' + _this.state.selectedWallets[index].value, newFile).then(function (response) {
                return response;
              }).catch(function (error) {
                alert(error);
              });

            case 13:
              res = _context.sent;

              _this.setState({
                textModal: index + 1 + '/' + _this.state.selectedWallets.length
              });

            case 15:
              index++;
              _context.next = 6;
              break;

            case 18:
              _this.setState({
                store: '',
                note: '',
                cardid: '',
                barcodetype: '',
                busy: false,
                selectedWallets: [],
                boolModal: true,
                titleModal: 'Success',
                textModal: 'Your new card has been added to your wallet. Go back to your wallet to see it.'
              });

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "loadWalletsNameAndId",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var ids, client, index;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ids = {};
              client = _this.props.client; // Get the id of the folder "My Wallets", and the content's id

              _context2.prev = 2;
              _context2.next = 5;
              return client.stackClient.fetchJSON('GET', '/files/metadata?Path=/My%20Wallets').then(function (response) {
                return {
                  dirId: response.data.id,
                  filesId: response.data.relationships.contents.data
                };
              });

            case 5:
              ids = _context2.sent;
              _context2.next = 13;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](2);
              _context2.next = 12;
              return client.stackClient.fetchJSON('POST', '/files/?Type=directory&Name=My%20Wallets').then(function (response) {
                return {
                  dirId: response.data.id,
                  filesId: []
                };
              }).catch(function (error) {
                alert(error);
              });

            case 12:
              ids = _context2.sent;

            case 13:
              index = 0;

            case 14:
              if (!(index < ids.filesId.length)) {
                _context2.next = 22;
                break;
              }

              // Get Wallet's name
              ids.filesId[index].value = ids.filesId[index].id;
              _context2.next = 18;
              return client.stackClient.fetchJSON('GET', '/files/' + ids.filesId[index].id).then(function (response) {
                return response.data.attributes.name.replace('.csv', '');
              });

            case 18:
              ids.filesId[index].label = _context2.sent;

            case 19:
              index++;
              _context2.next = 14;
              break;

            case 22:
              _this.setState({
                wallets: ids.filesId
              });

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 8]]);
    })));

    _this.state = {
      store: '',
      note: '',
      cardid: '',
      barcodetype: '',
      busy: false,
      wallets: [],
      selectedWallets: []
    };

    _this.loadWalletsNameAndId();

    return _this;
  }

  _createClass(EditCard, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        busy: this.state.busy,
        type: "button",
        onClick: this.addCard,
        label: "Save",
        size: "large",
        extension: "narrow"
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
        htmlFor: "name"
      }, "Name"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {
        id: "name",
        value: this.state.store,
        onChange: function onChange(event) {
          _this2.setState({
            store: event.target.value
          });
        }
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
        htmlFor: "name"
      }, "Note"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {
        id: "name",
        value: this.state.note,
        onChange: function onChange(event) {
          _this2.setState({
            note: event.target.value
          });
        }
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
        htmlFor: "id"
      }, "Card id"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {
        id: "id",
        value: this.state.cardid,
        onChange: function onChange(event) {
          if (event.target.value.length == 2) {
            _this2.setState({
              cardid: event.target.value,
              barcodetype: 'EAN_2'
            });
          } else if (event.target.value.length == 5) {
            _this2.setState({
              cardid: event.target.value,
              barcodetype: 'EAN_5'
            });
          } else if (event.target.value.length == 8) {
            _this2.setState({
              cardid: event.target.value,
              barcodetype: 'EAN_8'
            });
          } else if (event.target.value.length == 13) {
            _this2.setState({
              cardid: event.target.value,
              barcodetype: 'EAN_13'
            });
          } else {
            _this2.setState({
              cardid: event.target.value,
              barcodetype: 'CODE_128'
            });
          }
        }
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          background: 'white'
        }
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
        htmlFor: "type"
      }, "Format"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_SelectBox__WEBPACK_IMPORTED_MODULE_8__["default"], {
        id: "type",
        value: {
          value: this.state.barcodetype,
          label: this.state.barcodetype
        },
        onChange: function onChange(event) {
          _this2.setState({
            barcodetype: event.value
          });
        },
        options: [{
          value: 'CODE_128',
          label: 'CODE128'
        }, {
          value: 'CODE_39',
          label: 'CODE39'
        }, {
          value: 'EAN_' + this.state.cardid.length,
          label: 'EAN',
          isDisabled: this.state.cardid.length != 2 && this.state.cardid.length != 5 && this.state.cardid.length != 8 && this.state.cardid.length != 13
        }, {
          value: 'UPC_A',
          label: 'UPC_A',
          isDisabled: this.state.cardid.length != 12
        }, {
          value: 'UPC_E',
          label: 'UPC_E'
        }]
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          background: 'white'
        }
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
        htmlFor: "wallet"
      }, "Save in wallets"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_SelectBox__WEBPACK_IMPORTED_MODULE_8__["default"], {
        id: "wallet",
        isMulti: true,
        onChange: function onChange(event) {
          _this2.setState({
            selectedWallets: event
          });
        },
        components: {
          Option: cozy_ui_transpiled_react_SelectBox__WEBPACK_IMPORTED_MODULE_8__["CheckboxOption"]
        },
        options: this.state.wallets
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_barcode__WEBPACK_IMPORTED_MODULE_3___default.a, {
        ref: this.Barcode,
        value: this.state.cardid,
        format: this.state.barcodetype.replace('_', '')
      }), this.state.boolModal && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_7__["default"], {
        title: "Adding card",
        description: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_6__["default"], {
          icon: "cozy",
          title: this.state.titleModal,
          text: this.state.textModal
        }),
        dismissAction: function dismissAction() {
          return _this2.setState({
            boolModal: false
          });
        }
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null));
    }
  }]);

  return EditCard;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_9__["withClient"])(EditCard));

/***/ }),

/***/ "nw0P":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./_lib/build_formatting_tokens_reg_exp/index.js": "kOWh",
	"./ar/build_distance_in_words_locale/index.js": "XxX6",
	"./ar/build_format_locale/index.js": "alis",
	"./ar/index.js": "EDRf",
	"./be/build_distance_in_words_locale/index.js": "LQ09",
	"./be/build_format_locale/index.js": "kj7F",
	"./be/index.js": "YEhR",
	"./bg/build_distance_in_words_locale/index.js": "7K3h",
	"./bg/build_format_locale/index.js": "RrdL",
	"./bg/index.js": "isx8",
	"./ca/build_distance_in_words_locale/index.js": "wqqj",
	"./ca/build_format_locale/index.js": "qcV0",
	"./ca/index.js": "Vwa+",
	"./cs/build_distance_in_words_locale/index.js": "ZKDM",
	"./cs/build_format_locale/index.js": "ipyF",
	"./cs/index.js": "dvhP",
	"./da/build_distance_in_words_locale/index.js": "2Mgc",
	"./da/build_format_locale/index.js": "Gned",
	"./da/index.js": "7ur/",
	"./de/build_distance_in_words_locale/index.js": "5IWf",
	"./de/build_format_locale/index.js": "THCn",
	"./de/index.js": "bgw5",
	"./el/build_distance_in_words_locale/index.js": "o/GB",
	"./el/build_format_locale/index.js": "8T9h",
	"./el/index.js": "dH0v",
	"./en/build_distance_in_words_locale/index.js": "LZbM",
	"./en/build_format_locale/index.js": "6DAA",
	"./en/index.js": "Us+F",
	"./eo/build_distance_in_words_locale/index.js": "qrnn",
	"./eo/build_format_locale/index.js": "Bl15",
	"./eo/index.js": "UB7v",
	"./es/build_distance_in_words_locale/index.js": "GEfZ",
	"./es/build_format_locale/index.js": "O+zC",
	"./es/index.js": "/S0t",
	"./fi/build_distance_in_words_locale/index.js": "VHtQ",
	"./fi/build_format_locale/index.js": "Oydx",
	"./fi/index.js": "ndVD",
	"./fil/build_distance_in_words_locale/index.js": "uq4p",
	"./fil/build_format_locale/index.js": "d7hw",
	"./fil/index.js": "pNfm",
	"./fr/build_distance_in_words_locale/index.js": "IzMR",
	"./fr/build_format_locale/index.js": "I3Zg",
	"./fr/index.js": "LKA2",
	"./hr/build_distance_in_words_locale/index.js": "DPvn",
	"./hr/build_format_locale/index.js": "puw3",
	"./hr/index.js": "L9Jq",
	"./hu/build_distance_in_words_locale/index.js": "w2RQ",
	"./hu/build_format_locale/index.js": "/0iD",
	"./hu/index.js": "Nm+E",
	"./id/build_distance_in_words_locale/index.js": "JbvB",
	"./id/build_format_locale/index.js": "0wlw",
	"./id/index.js": "A6C3",
	"./is/build_distance_in_words_locale/index.js": "qzMC",
	"./is/build_format_locale/index.js": "S3yD",
	"./is/index.js": "N4bE",
	"./it/build_distance_in_words_locale/index.js": "MDEp",
	"./it/build_format_locale/index.js": "aUJd",
	"./it/index.js": "hmb4",
	"./ja/build_distance_in_words_locale/index.js": "nNvt",
	"./ja/build_format_locale/index.js": "buui",
	"./ja/index.js": "uAXs",
	"./ko/build_distance_in_words_locale/index.js": "oEw+",
	"./ko/build_format_locale/index.js": "9SQf",
	"./ko/index.js": "iW8+",
	"./mk/build_distance_in_words_locale/index.js": "nmwZ",
	"./mk/build_format_locale/index.js": "htxJ",
	"./mk/index.js": "GzBU",
	"./nb/build_distance_in_words_locale/index.js": "SL1f",
	"./nb/build_format_locale/index.js": "CJ5F",
	"./nb/index.js": "73vv",
	"./nl/build_distance_in_words_locale/index.js": "Uyu0",
	"./nl/build_format_locale/index.js": "doCD",
	"./nl/index.js": "hCQt",
	"./pl/build_distance_in_words_locale/index.js": "FUBD",
	"./pl/build_format_locale/index.js": "nOYf",
	"./pl/index.js": "B6yL",
	"./pt/build_distance_in_words_locale/index.js": "aTPA",
	"./pt/build_format_locale/index.js": "TTT0",
	"./pt/index.js": "gdks",
	"./ro/build_distance_in_words_locale/index.js": "gI+A",
	"./ro/build_format_locale/index.js": "njjO",
	"./ro/index.js": "r2yp",
	"./ru/build_distance_in_words_locale/index.js": "KmPx",
	"./ru/build_format_locale/index.js": "UUBw",
	"./ru/index.js": "nz/o",
	"./sk/build_distance_in_words_locale/index.js": "q2Bs",
	"./sk/build_format_locale/index.js": "9sxn",
	"./sk/index.js": "Wqan",
	"./sl/build_distance_in_words_locale/index.js": "mlv2",
	"./sl/build_format_locale/index.js": "vHkZ",
	"./sl/index.js": "KYSo",
	"./sr/build_distance_in_words_locale/index.js": "LlkS",
	"./sr/build_format_locale/index.js": "RhjJ",
	"./sr/index.js": "7mU3",
	"./sv/build_distance_in_words_locale/index.js": "UNBN",
	"./sv/build_format_locale/index.js": "zTNB",
	"./sv/index.js": "hxgj",
	"./th/build_distance_in_words_locale/index.js": "XAGa",
	"./th/build_format_locale/index.js": "We2s",
	"./th/index.js": "Pk+z",
	"./tr/build_distance_in_words_locale/index.js": "aFZF",
	"./tr/build_format_locale/index.js": "jh7A",
	"./tr/index.js": "3ZWG",
	"./zh_cn/build_distance_in_words_locale/index.js": "KdB7",
	"./zh_cn/build_format_locale/index.js": "l4EP",
	"./zh_cn/index.js": "8tMq",
	"./zh_tw/build_distance_in_words_locale/index.js": "vyyr",
	"./zh_tw/build_format_locale/index.js": "uYH7",
	"./zh_tw/index.js": "QPlQ"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "nw0P";

/***/ }),

/***/ "pZg0":
/***/ (function(module, exports) {

module.exports = {"name":"Cozy Wallet","slug":"wallet","icon":"icon.svg","categories":[],"version":"0.1.3","licence":"AGPL-3.0","editor":"","source":"https://github.com/tintinmar1995/cozy-wallet.git@build","developer":{"name":"tintinmar1995","url":""},"routes":{"/":{"folder":"/","index":"index.html","public":false}},"permissions":{"apps":{"description":"Required by Cozy Wallet to read and write on Drive","type":"io.cozy.files","verbs":["GET","PUT","DELETE"]},"mocks todos":{"description":"TO REMOVE: only used as demonstration about Cozy App data interactions","type":"io.mocks.todos"}}}

/***/ }),

/***/ "rQTU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("H+Xc");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("BuRe");
/* harmony import */ var react_barcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("8yty");
/* harmony import */ var react_barcode__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_barcode__WEBPACK_IMPORTED_MODULE_4__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Card =
/*#__PURE__*/
function (_Component) {
  _inherits(Card, _Component);

  function Card(props, context) {
    var _this;

    _classCallCheck(this, Card);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this, props, context));
    _this.state = {
      boolModal: false
    };
    return _this;
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var card = this.props.card;
      var boolModal = this.state.boolModal; // Prevent the app from printing an empty card

      if (!card.store) {
        return null;
      }

      var out = []; // The modal contains the barcode and a buttons to delete one card

      if (boolModal) {
        out.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
          title: card.store,
          secondaryAction: function secondaryAction() {
            _this2.setState({
              boolModal: false,
              cancelling: false
            });
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_1__["ModalContent"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("center", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_barcode__WEBPACK_IMPORTED_MODULE_4___default.a, {
          value: card.cardid,
          height: "100%",
          format: card.barcodetype.replace('_', '')
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, card.note), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          icon: "trash",
          busy: this.state.cancelling,
          type: "button",
          theme: "danger",
          onClick: function onClick() {
            _this2.setState({
              cancelling: !_this2.state.cancelling
            });
          },
          size: "tiny",
          label: "Delete"
        }), this.state.cancelling && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          type: "button",
          theme: "danger",
          size: "tiny",
          label: "Confirm",
          onClick: function onClick() {
            _this2.setState({
              boolModal: false
            });

            _this2.props.onClick(_this2.props.id);
          }
        }), this.state.cancelling && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          icon: "cross",
          type: "button",
          theme: "secondary",
          size: "tiny",
          onClick: function onClick() {
            _this2.setState({
              cancelling: !_this2.state.cancelling
            });
          },
          label: "Cancel"
        }))))));
      } // In the main tab, cards are shown as an Avator and a button to open a modal


      out.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          margin: '10px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Avatar__WEBPACK_IMPORTED_MODULE_3__["default"], {
        text: function (str) {
          if (str) {
            return str.substring(0, 1);
          }
        }(card.store),
        style: {
          marginRight: '10px'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: function onClick() {
          return _this2.setState({
            boolModal: true
          });
        },
        label: card.store,
        size: "large",
        theme: "ghost",
        extension: "narrow"
      })));
      return out;
    }
  }]);

  return Card;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Card);

/***/ }),

/***/ "xYwX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0cfB");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("55Ip");
/* harmony import */ var cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Bh3+");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("y6ex");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("fH6n");
/* harmony import */ var _WalletsViewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7WNl");
/* harmony import */ var _NewCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("6boQ");








var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["HashRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_3__["Layout"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sidebar__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_3__["Main"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_3__["Content"], {
    className: "app-content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/wallet",
    component: _WalletsViewer__WEBPACK_IMPORTED_MODULE_6__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/add",
    component: _NewCard__WEBPACK_IMPORTED_MODULE_7__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], {
    from: "/",
    to: "/wallet"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], {
    from: "*",
    to: "/wallet"
  })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_4__["Sprite"], null)));
};
/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(App));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ })

/******/ });
//# sourceMappingURL=wallet.js.map