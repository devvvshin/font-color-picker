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
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TEST_TEXT = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

	var ColorPanel = function () {
	  function ColorPanel(delay) {
	    _classCallCheck(this, ColorPanel);

	    var ele = document.createElement('div');
	    ele.innerHTML = TEST_TEXT;
	    ele.style.padding = '16px';
	    ele.style.lineHeight = '26px';
	    ele.style.background = "#" + ((1 << 24) * Math.random() | 0).toString(16);
	    ele.style.opacity = 0.0;
	    ele.style.overflow = 'hidden';

	    this.ele = ele;
	    this.appearOptions = {
	      startTime: 0,
	      duration: 300,
	      delay: delay
	    };
	  }

	  _createClass(ColorPanel, [{
	    key: 'appear',
	    value: function appear() {
	      var _this = this;

	      var ele = this.ele,
	          appearOptions = this.appearOptions;

	      var render = function render(time) {
	        var t = (Date.now() - appearOptions.startTime) / appearOptions.duration;
	        var a = _this._ease(t <= 1.0 ? t : 1.0);
	        ele.style.opacity = a;
	        t <= 1.0 ? requestAnimationFrame(render) : '';
	      };

	      setTimeout(function () {
	        appearOptions.startTime = Date.now();
	        requestAnimationFrame(render);
	      }, appearOptions.delay);
	    }
	  }, {
	    key: 'appendTo',
	    value: function appendTo(parent) {
	      parent.appendChild(this.ele);

	      this.appear();
	    }
	  }, {
	    key: '_ease',
	    value: function _ease(t) {
	      return t * t * t;
	    }
	  }]);

	  return ColorPanel;
	}();

	window.onload = function () {
	  var app = document.getElementById('app');

	  app.style.height = '100vh';
	  app.style.display = 'flex';
	  app.style.flexDirection = 'column';

	  for (var i = 0; i < 2; i++) {
	    var panel = new ColorPanel(200 * i);
	    panel.ele.style.flex = 1;
	    panel.appendTo(app);
	  }
	};

/***/ }
/******/ ]);