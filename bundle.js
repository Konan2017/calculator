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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _creator = __webpack_require__(1);

	var _creator2 = _interopRequireDefault(_creator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	(function app() {
	    var wrapper1 = document.querySelector('.calculator');
	    (0, _creator2["default"])(wrapper1);
	})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = creator;

	__webpack_require__(2);

	var _Calculator = __webpack_require__(7);

	var _Calculator2 = _interopRequireDefault(_Calculator);

	var _Window = __webpack_require__(8);

	var _Window2 = _interopRequireDefault(_Window);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function creator(element) {
	  var calculator = new _Calculator2["default"]();
	  // calculator 모델을 주입함. 이로써 Window 뷰 객체는 Calculator의
	  // 인터페이스에 의존하게 되며, 추후 공학계산기용 calculator 객체를 생성
	  // 주입하여 공학계산 모드를 지원할 수 있음.
	  var window = new _Window2["default"](element, calculator);
	  return window;
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var calculator = function () {
	    function calculator() {
	        _classCallCheck(this, calculator);

	        this._listeners = {};
	        this.calcArr = ['0'];
	        this.result = null;
	    }
	    /**
	     * 입력된 값에 따라 추가 또는 업데이트 한다.
	     * @param {string} val
	     */


	    calculator.prototype.update = function update(val) {
	        if (!this._checkValidVal(val)) return false;
	        var newVal = val;
	        var newType = this._checkType(newVal);
	        var lastVal = this._getLastVal();
	        var lastInputType = this._checkType(lastVal);

	        if (lastInputType === 'operand' && newType === 'operand') {
	            if (lastVal.indexOf('.') > -1 && lastVal.split('.')[1].length < 5 || lastVal.indexOf('.') === -1 && lastVal.length < 10) {
	                this._updateLastVal(newVal === '.' ? '' + lastVal + newVal : parseFloat('' + lastVal + newVal));
	            }
	        } else if (lastInputType === 'operand' && newType === 'operator') {
	            this._push(newVal);
	        } else if (lastInputType === 'operator' && newType === 'operand') {
	            this._push(newVal === '.' ? '0.' : newVal);
	        } else if (lastInputType === 'operator' && newType === 'operator') {
	            this._updateLastVal(newVal);
	        }
	        this._eventfire('update');
	    };
	    /**
	     * 이벤트를 바인딩한다.
	     * @param {string} name
	     * @param {function} listener
	     */


	    calculator.prototype.on = function on(name, listener) {
	        if (!this._listeners[name]) {
	            this._listeners[name] = [];
	        }
	        this._listeners[name].push(listener);
	    };
	    /**
	     * 입력된 값들을 평가한다.
	     */


	    calculator.prototype.evaluate = function evaluate() {
	        var rawData = null;
	        var lastVal = this._getLastVal();
	        var lastInputType = this._checkType(lastVal);
	        if (this.calcArr.length < 2) throw new Error('하나 이상의 연산이 필요합니다.');
	        if (lastInputType === 'operator') throw new Error('피연산자가 필요합니다.');
	        if (this.result) {
	            var calcArrLength = this.calcArr.length;
	            rawData = eval('' + this.result + this.calcArr[calcArrLength - 2] + this.calcArr[calcArrLength - 1]);
	        } else {
	            rawData = eval(this.calcArr.join(''));
	        }
	        this.result = this._cutInfiveDemicalPlace(rawData);
	        this._eventfire('finish');
	    };
	    /**
	     * 값들을 초기화한다.
	     */


	    calculator.prototype.clear = function clear() {
	        this.calcArr = ['0'];
	        this.result = null;
	        this._eventfire('update');
	    };
	    /**
	     * 연산식을 반환한다.
	     */


	    calculator.prototype.getExpression = function getExpression() {
	        return this.calcArr.slice(0);
	    };
	    /**
	     * 입력된 값이 유효한 값인지 검사한다.
	     * @param {string} val
	     * @private
	     */


	    calculator.prototype._checkValidVal = function _checkValidVal(val) {
	        return !!(val && val.match(/[0-9\.\+\-\/\*\=r]/));
	    };
	    /**
	     * 입력된 값의 타입을 검사한다.
	     * @param {string} val
	     * @private
	     */


	    calculator.prototype._checkType = function _checkType(val) {
	        return val === '.' || !isNaN(parseInt(val)) ? 'operand' : 'operator';
	    };
	    /**
	     * 마지막 값을 반환한다.
	     * @private
	     */


	    calculator.prototype._getLastVal = function _getLastVal() {
	        return this.calcArr[this.calcArr.length - 1];
	    };
	    /**
	     * 입력된 값을 평가 후보자에 추가한다.
	     * @param {string} val
	     * @private
	     */


	    calculator.prototype._push = function _push(val) {
	        this.calcArr.push(val);
	    };
	    /**
	     * 마지막값을 업데이트한다.
	     * @param {string} val
	     * @private
	     */


	    calculator.prototype._updateLastVal = function _updateLastVal(val) {
	        this.calcArr[this.calcArr.length - 1] = val + '';
	    };
	    /**
	     * 입력된 값을 소수점 5자리까지만 자른다.
	     * @param {string} val
	     * @private
	     */


	    calculator.prototype._cutInfiveDemicalPlace = function _cutInfiveDemicalPlace(val) {
	        return parseFloat(val.toFixed(5));
	    };
	    /**
	     * 이벤트를 발화한다.
	     * @param {string} name
	     * @param {*} rest
	     * @private
	     */


	    calculator.prototype._eventfire = function _eventfire(name) {
	        if (this._listeners[name]) {
	            var listeners = this._listeners[name];

	            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                rest[_key - 1] = arguments[_key];
	            }

	            for (var i = 0, n = listeners.length; i < n; i++) {
	                listeners[i].apply(null, rest);
	            }
	        }
	    };

	    return calculator;
	}();

	exports["default"] = calculator;
	;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Window = function () {
	    function Window(element, calculator) {
	        _classCallCheck(this, Window);

	        this._element = element;
	        this._display = element.querySelector('.calculator__input-text');
	        this._calculator = calculator;
	        this._bindEvents();
	        this._calculator.clear();
	    }

	    Window.prototype._bindEvents = function _bindEvents() {
	        this._element.addEventListener('click', this.onClickCalcBtn.bind(this), false);
	        this._calculator.on('update', this.onUpdateCalculator.bind(this));
	        this._calculator.on('finish', this.onFinishCalculator.bind(this));
	    };

	    Window.prototype.onClickCalcBtn = function onClickCalcBtn(event) {
	        event.preventDefault();
	        event.stopPropagation();
	        var targetBtn = event.target || event.srcElement;
	        var val = targetBtn.getAttribute('data-val');
	        if (val) {
	            switch (val) {
	                case 'r':
	                    this._calculator.clear();
	                    break;
	                case '=':
	                    this._calculator.evaluate();
	                    break;
	                default:
	                    this._calculator.update(val);
	                    break;
	            }
	        }
	    };

	    Window.prototype.onUpdateCalculator = function onUpdateCalculator() {
	        var val = this.formatExpression(this._calculator.getExpression());
	        this._display.innerHTML = val;
	    };

	    Window.prototype.onFinishCalculator = function onFinishCalculator() {
	        this._display.innerHTML = this.formatNumber(this._calculator.result);
	    };

	    Window.prototype.formatExpression = function formatExpression(expression) {
	        var expressionLength = expression.length;
	        for (var i = 0; i < expressionLength; i++) {
	            if (!isNaN(parseFloat(expression[i]))) {
	                expression[i] = this.formatNumber(expression[i]);
	            }
	        }
	        return expression.join('');
	    };

	    Window.prototype.formatNumber = function formatNumber(num) {
	        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	    };

	    return Window;
	}();

	exports["default"] = Window;
	;

/***/ })
/******/ ]);