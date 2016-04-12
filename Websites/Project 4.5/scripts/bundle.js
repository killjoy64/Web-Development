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
	 * Created by Administrator on 3/14/2016.
	 */
	"use strict";

	var _ClickHandler = __webpack_require__(1);

	var _ClickHandler2 = _interopRequireDefault(_ClickHandler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onload = function () {
	    var clickHandler = new _ClickHandler2.default();

	    clickHandler.initButtonListeners();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 3/16/2016.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PinLookup = __webpack_require__(2);

	var _PinLookup2 = _interopRequireDefault(_PinLookup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ClickHandler = function () {
	    function ClickHandler() {
	        _classCallCheck(this, ClickHandler);
	    }

	    _createClass(ClickHandler, [{
	        key: "initButtonListeners",
	        value: function initButtonListeners() {
	            document.getElementById("console").innerText = "Enter your PIN";
	            document.getElementById("button-1").innerText = "ENTER";

	            var BUTTONS = 6;

	            for (var i = 2; i <= BUTTONS; i++) {
	                document.getElementById("button-" + i).innerText = "";
	            }

	            document.getElementById("button-1").addEventListener("click", function () {
	                if (document.getElementById("button-1").innerText == "ENTER") {
	                    if (document.getElementById("input-window").value.length == 0 || document.getElementById("input-window").value.length > 4) {
	                        alert("Please enter a correct 4 digit PIN number");
	                    } else {
	                        new _PinLookup2.default().requestPin();
	                    }
	                }
	            });
	        }
	    }, {
	        key: "textCheck",
	        value: function textCheck() {}
	    }]);

	    return ClickHandler;
	}();

	exports.default = ClickHandler;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kyle Flynn on 4/11/2016.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DataLoader = __webpack_require__(3);

	var _DataLoader2 = _interopRequireDefault(_DataLoader);

	var _ATM = __webpack_require__(4);

	var _ATM2 = _interopRequireDefault(_ATM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PinLookup = function () {
	    function PinLookup() {
	        _classCallCheck(this, PinLookup);
	    }

	    _createClass(PinLookup, [{
	        key: "requestPin",
	        value: function requestPin(pin) {
	            _DataLoader2.default.loadData("data/users.csv", this.search);
	        }
	    }, {
	        key: "search",
	        value: function search(data) {
	            var COLUMNS = 4;

	            var foundPin = false;

	            for (var i = 0; i < data.length; i++) {
	                if (document.getElementById("input-window").value == data[i][1]) {
	                    foundPin = true;
	                    console.log("loading user data " + data[i][1]);
	                    var userData = [COLUMNS];
	                    for (var j = 0; j < COLUMNS; j++) {
	                        userData[j] = data[i][j];
	                    }
	                    var atm = new _ATM2.default(userData);
	                    atm.init();
	                }
	            }

	            if (!foundPin) {
	                document.getElementById("console").innerText = "Invalid PIN, please re-enter.";
	            }
	        }
	    }]);

	    return PinLookup;
	}();

	exports.default = PinLookup;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by Kyle Flynn on 4/10/2016.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserReader = function () {
	    function UserReader() {
	        _classCallCheck(this, UserReader);
	    }

	    _createClass(UserReader, null, [{
	        key: "loadData",
	        value: function loadData(filePath, callback) {
	            console.log("Requesting File: " + filePath);

	            var request = new XMLHttpRequest();
	            request.open("GET", "" + filePath, true);
	            request.send();
	            request.onload = function () {
	                var COLUMNS = 4;
	                var data = void 0,
	                    middleData = void 0,
	                    fileData = [];
	                if (request.readyState === 4 && request.status === 200) {
	                    data = request.responseText.split(/\n/);
	                }
	                for (var i = 0; i < data.length; i++) {
	                    middleData = data[i].split(/,/);
	                    fileData[i] = []; //makes it an MD array
	                    for (var j = 0; j < COLUMNS; j++) {
	                        fileData[i][j] = middleData[j];
	                    }
	                }
	                callback(fileData);
	            };
	        }
	    }]);

	    return UserReader;
	}();

	exports.default = UserReader;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by Kyle Flynn on 4/11/2016.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ATM = function () {
	    function ATM(data) {
	        _classCallCheck(this, ATM);

	        this.data = data;
	        this.name = data[0];
	        this.pin = data[1];
	        this.savings = data[2];
	        this.checking = data[3];
	        this.transfer = false;
	        this.withdraw = false;
	    }

	    _createClass(ATM, [{
	        key: "init",
	        value: function init() {
	            document.getElementById("console").innerText = "Welcome, " + this.name;
	            document.getElementById("input-window").value = "";

	            document.getElementById("button-1").innerText = "EXIT";
	            document.getElementById("button-2").innerText = "BALANCES";
	            document.getElementById("button-3").innerText = "TRANSFER";
	            document.getElementById("button-4").innerText = "WITHDRAW";

	            var self = this;

	            document.getElementById("button-1").addEventListener("click", function () {
	                if (document.getElementById("button-3").innerText == "TRANSFER") {
	                    document.getElementById("button-1").innerText = "Enter";
	                    document.getElementById("button-2").innerText = "";
	                    document.getElementById("button-3").innerText = "";
	                    document.getElementById("button-4").innerText = "";
	                    document.getElementById("console").innerText = "Enter your PIN number";
	                    document.getElementById("input-window").value = "";
	                } else {
	                    document.getElementById("button-1").innerText = "EXIT";
	                    document.getElementById("button-2").innerText = "BALANCES";
	                    document.getElementById("button-3").innerText = "TRANSFER";
	                    document.getElementById("button-4").innerText = "WITHDRAW";

	                    self.transfer = false;
	                    self.withdraw = false;
	                }
	            });
	            document.getElementById("button-2").addEventListener("click", function () {
	                if (document.getElementById("button-2").innerText == "BALANCES") {
	                    document.getElementById("console").innerText = "Checking - $" + self.checking + " Savings - $" + self.savings;
	                }
	            });
	            document.getElementById("button-3").addEventListener("click", function () {
	                if (document.getElementById("button-3").innerText == "TRANSFER") {
	                    document.getElementById("console").innerText = "Would you like to transfer from checking or savings?";
	                    document.getElementById("button-3").innerText = "CHECKING";
	                    document.getElementById("button-4").innerText = "SAVINGS";
	                    self.transfer = true;
	                } else if (document.getElementById("button-3").innerText == "CHECKING") {
	                    if (self.transfer) {
	                        document.getElementById("console").innerText = "Enter amount to transfer";
	                        document.getElementById("button-3").innerText = "CONFIRM";
	                        document.getElementById("button-4").innerText = "";
	                    } else if (self.withdraw) {
	                        document.getElementById("console").innerText = "Enter amount to withdraw";
	                        document.getElementById("button-3").innerText = "CONFIRM";
	                        document.getElementById("button-4").innerText = "";
	                    }
	                } else if (document.getElementById("button-3").innerText == "CONFIRM") {
	                    if (self.transfer) {
	                        try {
	                            var amount = parseFloat(document.getElementById("input-window").value);
	                            if (amount > self.checking) {
	                                alert("YOU DO NOT HAVE SUFFICIENT FUNDS. NICE TRY.");
	                            } else {
	                                var oldChecking = parseFloat(self.checking);
	                                var oldSavings = parseFloat(self.savings);
	                                self.checking = oldChecking - amount;
	                                self.savings = oldSavings + amount;
	                                document.getElementById("console").innerText = "New savings balance - $" + self.savings;
	                                document.getElementById("input-window").value = "";

	                                document.getElementById("button-1").innerText = "EXIT";
	                                document.getElementById("button-2").innerText = "BALANCES";
	                                document.getElementById("button-3").innerText = "TRANSFER";
	                                document.getElementById("button-4").innerText = "WITHDRAW";

	                                self.transfer = false;
	                                self.withdraw = false;
	                            }
	                        } catch (e) {
	                            alert("Error reading amount, please try again!");
	                        }
	                    } else if (self.withdraw) {
	                        try {
	                            var _amount = parseFloat(document.getElementById("input-window").value);
	                            if (_amount > self.checking) {
	                                alert("YOU DO NOT HAVE SUFFICIENT FUNDS. NICE TRY.");
	                            } else {
	                                var _oldChecking = parseFloat(self.checking);
	                                self.checking = _oldChecking - _amount;
	                                document.getElementById("console").innerText = "New checking balance - $" + self.checking;
	                                document.getElementById("input-window").value = "";

	                                document.getElementById("button-1").innerText = "EXIT";
	                                document.getElementById("button-2").innerText = "BALANCES";
	                                document.getElementById("button-3").innerText = "TRANSFER";
	                                document.getElementById("button-4").innerText = "WITHDRAW";

	                                self.transfer = false;
	                                self.withdraw = false;
	                            }
	                        } catch (e) {
	                            alert("Error reading amount, please try again!");
	                        }
	                    }
	                }
	            });
	            document.getElementById("button-4").addEventListener("click", function () {
	                if (document.getElementById("button-4").innerText == "WITHDRAW") {
	                    document.getElementById("console").innerText = "Would you like to withdraw from checking or savings?";
	                    document.getElementById("button-3").innerText = "CHECKING";
	                    document.getElementById("button-4").innerText = "SAVINGS";
	                    self.withdraw = true;
	                } else if (document.getElementById("button-4").innerText == "SAVINGS") {
	                    if (self.transfer) {
	                        document.getElementById("console").innerText = "Enter amount to transfer";
	                        document.getElementById("button-4").innerText = "CONFIRM";
	                        document.getElementById("button-3").innerText = "";
	                    } else if (self.withdraw) {
	                        document.getElementById("console").innerText = "Enter amount to withdraw";
	                        document.getElementById("button-4").innerText = "CONFIRM";
	                        document.getElementById("button-3").innerText = "";
	                    }
	                } else if (document.getElementById("button-4").innerText == "SAVINGS") {
	                    if (self.transfer) {
	                        try {
	                            var amount = parseFloat(document.getElementById("input-window").value);
	                            if (amount > self.savings) {
	                                alert("YOU DO NOT HAVE SUFFICIENT FUNDS. NICE TRY.");
	                            } else {
	                                var oldChecking = parseFloat(self.checking);
	                                var oldSavings = parseFloat(self.savings);
	                                self.checking = oldChecking + amount;
	                                self.savings = oldSavings - amount;
	                                document.getElementById("console").innerText = "New checking balance - $" + self.checking;
	                                document.getElementById("input-window").value = "";

	                                document.getElementById("button-1").innerText = "EXIT";
	                                document.getElementById("button-2").innerText = "BALANCES";
	                                document.getElementById("button-3").innerText = "TRANSFER";
	                                document.getElementById("button-4").innerText = "WITHDRAW";

	                                self.transfer = false;
	                                self.withdraw = false;
	                            }
	                        } catch (e) {
	                            alert("Error reading amount, please try again!");
	                        }
	                    } else if (self.withdraw) {
	                        try {
	                            var _amount2 = parseFloat(document.getElementById("input-window").value);
	                            if (_amount2 > self.savings) {
	                                alert("YOU DO NOT HAVE SUFFICIENT FUNDS. NICE TRY.");
	                            } else {
	                                var _oldSavings = parseFloat(self.savings);
	                                self.savings = _oldSavings - _amount2;
	                                document.getElementById("console").innerText = "New savings balance - $" + self.savings;
	                                document.getElementById("input-window").value = "";

	                                document.getElementById("button-1").innerText = "EXIT";
	                                document.getElementById("button-2").innerText = "BALANCES";
	                                document.getElementById("button-3").innerText = "TRANSFER";
	                                document.getElementById("button-4").innerText = "WITHDRAW";

	                                self.transfer = false;
	                                self.withdraw = false;
	                            }
	                        } catch (e) {
	                            alert("Error reading amount, please try again!");
	                        }
	                    }
	                }
	            });
	        }
	    }, {
	        key: "checkButtonTwo",
	        value: function checkButtonTwo() {
	            console.log(this.savings);
	        }
	    }]);

	    return ATM;
	}();

	exports.default = ATM;

/***/ }
/******/ ]);