/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kyle Flynn on 2/14/2016.
	 */
	"use strict";

	var _SceneManager = __webpack_require__(1);

	var _SceneManager2 = _interopRequireDefault(_SceneManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onload = function () {
	  _SceneManager2.default.init();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2/17/2016.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _SceneLoader = __webpack_require__(2);

	var _SceneLoader2 = _interopRequireDefault(_SceneLoader);

	var _TextMasker = __webpack_require__(3);

	var _TextMasker2 = _interopRequireDefault(_TextMasker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SceneManager = function () {
	    function SceneManager() {
	        _classCallCheck(this, SceneManager);
	    }

	    _createClass(SceneManager, null, [{
	        key: 'init',
	        value: function init() {
	            _SceneLoader2.default.loadData("data/scene-0.csv", SceneManager.createScene);
	        }
	    }, {
	        key: 'createScene',
	        value: function createScene(fileData) {
	            var textMasker = new _TextMasker2.default();

	            textMasker.unmask("null");
	            SceneManager.clearFields();

	            var COLUMNS = 2;

	            for (var i = 0; i < fileData.length; i++) {
	                for (var j = 0; j < COLUMNS; j++) {
	                    if (fileData[i][0] == "descr") {
	                        document.getElementById("path-descr").innerText = fileData[i][j];
	                    }
	                    if (fileData[i][0] == "o-1") {
	                        document.getElementById("option-one-txt").innerText = fileData[i][j];
	                    }
	                    if (fileData[i][0] == "o-2") {
	                        document.getElementById("option-two-txt").innerText = fileData[i][j];
	                    }
	                    if (fileData[i][0] == "1") {
	                        document.getElementById("option-one-loc").innerText = fileData[i][1];
	                    }
	                    if (fileData[i][0] == "2") {
	                        document.getElementById("option-two-loc").innerText = fileData[i][1];
	                    }
	                }
	            }

	            textMasker.mask("null");

	            document.getElementById("continue-btn").addEventListener("click", SceneManager.processAnswer);
	        }
	    }, {
	        key: 'clearFields',
	        value: function clearFields() {
	            document.getElementById("path-descr").innerText = "";
	            document.getElementById("option-one-txt").innerText = "null";
	            document.getElementById("option-two-txt").innerText = "null";
	            document.getElementById("option-one-loc").innerText = "";
	            document.getElementById("option-two-loc").innerText = "";
	            document.getElementById("option-one").checked = false;
	            document.getElementById("option-two").checked = false;
	        }
	    }, {
	        key: 'processAnswer',
	        value: function processAnswer() {
	            var pathOneChecked = document.getElementById("option-one").checked;
	            var pathTwoChecked = document.getElementById("option-two").checked;

	            var pathOneHasValue = document.getElementById("option-one-txt").innerText != "null";
	            var pathTwoHasValue = document.getElementById("option-two-txt").innerText != "null";

	            if (pathOneChecked && pathOneHasValue) {
	                _SceneLoader2.default.loadData("data/" + document.getElementById("option-one-loc").innerText, SceneManager.createScene);
	            } else if (pathTwoChecked && pathTwoHasValue) {
	                _SceneLoader2.default.loadData("data/" + document.getElementById("option-two-loc").innerText, SceneManager.createScene);
	            } else {
	                alert("You must choose a path, sir!");
	            }
	        }
	    }]);

	    return SceneManager;
	}();

	exports.default = SceneManager;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by Kyle Flynn on 2/15/2016.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PathReader = function () {
	    function PathReader() {
	        _classCallCheck(this, PathReader);
	    }

	    _createClass(PathReader, null, [{
	        key: "loadData",
	        value: function loadData(filePath, callback) {
	            console.log("Scene Path: " + filePath);

	            var request = new XMLHttpRequest();
	            request.open("GET", "" + filePath, true);
	            request.send();
	            request.onload = function () {
	                var COLUMNS = 2;
	                var data = void 0,
	                    middleData = void 0,
	                    fileData = [];
	                if (request.readyState === 4 && request.status === 200) {
	                    data = request.responseText.split(/\n/);
	                }
	                for (var i = 0; i < data.length; i++) {
	                    middleData = data[i].split(/:/);
	                    fileData[i] = []; //makes it an MD array
	                    for (var j = 0; j < COLUMNS; j++) {
	                        fileData[i][j] = middleData[j];
	                    }
	                }
	                callback(fileData);
	            };
	        }
	    }]);

	    return PathReader;
	}();

	exports.default = PathReader;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by Administrator on 2/24/2016.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextMasker = function () {
	    function TextMasker() {
	        _classCallCheck(this, TextMasker);
	    }

	    _createClass(TextMasker, [{
	        key: "mask",
	        value: function mask(textToHide) {
	            if (document.getElementById("option-one-txt").innerText == textToHide) {
	                document.getElementById("option-one").style.display = "none";
	                document.getElementById("option-one-txt").style.display = "none";
	            }
	            if (document.getElementById("option-two-txt").innerText == textToHide) {
	                document.getElementById("option-two").style.display = "none";
	                document.getElementById("option-two-txt").style.display = "none";
	            }
	        }
	    }, {
	        key: "unmask",
	        value: function unmask(textToReveal) {
	            if (document.getElementById("option-one-txt").innerText == textToReveal) {
	                document.getElementById("option-one").style.display = "initial";
	                document.getElementById("option-one-txt").style.display = "initial";
	            }
	            if (document.getElementById("option-two-txt").innerText == textToReveal) {
	                document.getElementById("option-two").style.display = "initial";
	                document.getElementById("option-two-txt").style.display = "initial";
	            }
	        }
	    }]);

	    return TextMasker;
	}();

	exports.default = TextMasker;

/***/ }
/******/ ]);