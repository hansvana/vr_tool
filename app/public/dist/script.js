/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _threeView = __webpack_require__(1);

var _threeView2 = _interopRequireDefault(_threeView);

var _threeWorld = __webpack_require__(2);

var _threeWorld2 = _interopRequireDefault(_threeWorld);

var _menuhandler = __webpack_require__(3);

var _menuhandler2 = _interopRequireDefault(_menuhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller(a, b) {
        var _this = this;

        _classCallCheck(this, Controller);

        this.view = new _threeView2.default();
        this.world = new _threeWorld2.default([this.view.cameraControlObject, this.view.transformControlObject]);
        this.menu = new _menuhandler2.default();

        this.menu.events.imgUploaded = function (data) {
            _this.world.addPlane(data).then(function (mesh) {
                _this.view.attachTransformControls(mesh);
            });
        };

        this.mainLoop();
    }

    _createClass(Controller, [{
        key: 'mainLoop',
        value: function mainLoop() {
            var _this2 = this;

            window.requestAnimationFrame(function () {
                _this2.mainLoop();
            });

            this.world.update();
            this.view.render(this.world.scene);
        }
    }]);

    return Controller;
}();

document.addEventListener("DOMContentLoaded", function (e) {
    var c = new Controller();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View() {
    var _this = this;

    _classCallCheck(this, View);

    this.camera = this.getCamera();
    this.renderer = this.getRenderer();
    this.cameraControls = this.getCameraControls();
    this.transformControls = this.getTransformControls();

    window.addEventListener('resize', function (e) {
      _this.resizeHandler(e.target.innerWidth, e.target.innerHeight);
    });
  }

  /*
   * 'Public' methods
   */

  _createClass(View, [{
    key: 'render',
    value: function render(scene) {
      this.renderer.render(scene, this.camera);
    }
  }, {
    key: 'attachTransformControls',
    value: function attachTransformControls(mesh) {
      this.transformControls.attach(mesh);
    }

    /*
     * 'Private' methods
     */

  }, {
    key: 'resizeHandler',
    value: function resizeHandler(w, h) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.camera.useQuaternions = true;
      this.renderer.setSize(w, h);
    }

    /*
     *  'Init' methods
     */

  }, {
    key: 'getCamera',
    value: function getCamera() {
      var cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      return cam;
    }
  }, {
    key: 'getCameraControls',
    value: function getCameraControls() {
      var _this2 = this;

      var controls = new THREE.PointerLockControls(this.camera);

      controls.getObject().position.y = 1;
      controls.getObject().position.z = 5;

      document.addEventListener('mousedown', function (e) {
        if (e.button == 2) controls.enabled = true;
      });
      document.addEventListener('mouseup', function () {
        controls.enabled = false;
      });
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });

      document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
          case 17:
            // Ctrl
            _this2.transformControls.setTranslationSnap(100);
            _this2.transformControls.setRotationSnap(THREE.Math.degToRad(15));
            break;
          case 77:
            // M
            _this2.transformControls.setMode("translate");
            break;
          case 82:
            // R
            _this2.transformControls.setMode("rotate");
            break;
          case 83:
            // S
            _this2.transformControls.setMode("scale");
            break;
        }
      });

      document.addEventListener('keyup', function (e) {
        switch (e.keyCode) {
          case 17:
            // Ctrl
            _this2.transformControls.setTranslationSnap(null);
            _this2.transformControls.setRotationSnap(null);
            break;
        }
      });
      return controls;
    }
  }, {
    key: 'getTransformControls',
    value: function getTransformControls() {
      return new THREE.TransformControls(this.camera, this.renderer.domElement);
      //control.addEventListener( 'change', render );
    }
  }, {
    key: 'getRenderer',
    value: function getRenderer() {
      var r = new THREE.WebGLRenderer();
      r.setClearColor(0x000000, 1);
      r.setSize(window.innerWidth, window.innerHeight);
      r.shadowMap.enabled = true;
      document.body.appendChild(r.domElement);
      return r;
    }
  }, {
    key: 'cameraControlObject',
    get: function get() {
      return this.cameraControls.getObject();
    }
  }, {
    key: 'transformControlObject',
    get: function get() {
      return this.transformControls;
    }
  }, {
    key: 'domElement',
    get: function get() {
      return this.renderer.domElement;
    }
  }]);

  return View;
}();

exports.default = View;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
  function World(additionalObjs) {
    var _this = this;

    _classCallCheck(this, World);

    this.floorObject = this.getFloorObject();
    this.lights = this.getLights();
    this.skybox = this.getSkybox();
    this.scene = this.getScene();

    additionalObjs.forEach(function (obj) {
      _this.scene.add(obj);
    });
  }

  /*
  * 'Public' methods
  */

  _createClass(World, [{
    key: "update",
    value: function update() {
      //this.worldObject.rotation.x += 0.01;
      //this.worldObject.rotation.z += 0.01;
    }
  }, {
    key: "addPlane",
    value: function addPlane(image) {
      var _this2 = this;

      return new Promise(function (resolve) {
        console.log(image);
        var material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(image.url),
          side: THREE.DoubleSide
        });

        var scale = 1 / Math.max(image.width, image.height);

        var geometry = new THREE.PlaneGeometry(image.width * scale, image.height * scale);

        var plane = new THREE.Mesh(geometry, material);
        _this2.scene.add(plane);

        resolve(plane);
      });
    }

    /*
     * 'Private' methods
     */

    /*
     *  'Init' methods
     */

  }, {
    key: "getLights",
    value: function getLights() {
      var lights = [];
      var l = void 0;

      l = new THREE.PointLight(0xffffff, 2, 0);
      l.position.set(0, 10, 0);
      lights.push(l);

      return lights;
    }
  }, {
    key: "getSkybox",
    value: function getSkybox() {
      var imagePrefix = "/assets/skybox/clouds/";
      var directions = ["WEST", "EAST", "TOP", "BOTTOM", "SOUTH", "NORTH"];
      var imageSuffix = ".jpg";

      var skyGeometry = new THREE.BoxGeometry(100, 100, 100);
      var loader = new THREE.TextureLoader();

      var skyMaterial = [];
      for (var i = 0; i < 6; i++) {
        skyMaterial.push(new THREE.MeshBasicMaterial({
          map: loader.load(imagePrefix + directions[i] + imageSuffix),
          side: THREE.BackSide
        }));
      }

      return new THREE.Mesh(skyGeometry, skyMaterial);
    }
  }, {
    key: "getScene",
    value: function getScene() {
      var scene = new THREE.Scene();

      this.lights.forEach(function (l) {
        scene.add(l);
      });

      scene.add(this.skybox);
      scene.add(this.floorObject);

      return scene;
    }
  }, {
    key: "getFloorObject",
    value: function getFloorObject() {
      var plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 1), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      plane.rotation.x -= Math.PI / 2;
      return plane;
    }
  }]);

  return World;
}();

exports.default = World;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuHandler = function () {
    function MenuHandler() {
        var _this = this;

        _classCallCheck(this, MenuHandler);

        this.ui = {
            "imgSubmit": document.getElementById("imgSubmit"),
            "imgUpload": document.getElementById("imgUpload")
        };

        this.events = {
            "imgUploaded": null
        };

        this.ui.imgSubmit.addEventListener("click", function () {
            _this.uploadImage();
        });
    }

    _createClass(MenuHandler, [{
        key: "uploadImage",
        value: function uploadImage() {
            var _this2 = this;

            var file = this.ui.imgUpload.files[0];
            var formData = new FormData();

            if (!file.type.match('image.*')) {
                statusDiv.innerHTML = 'This file is not an image. Sorry, it can’t be uploaded. Try again with a valid image.';
                return;
            }

            if (file.size >= 10000000) {
                statusDiv.innerHTML = 'This file is larger than 10MB. Sorry, it can’t be uploaded.';
                return;
            }

            formData.append('imgUpload', file, file.name);

            // Set up the AJAX request.
            var xhr = new XMLHttpRequest();

            // Open the connection.
            xhr.open('POST', '/upload', true);

            // Set up a handler for when the request finishes.
            xhr.onload = function () {
                if (xhr.status === 200) {
                    try {
                        var json = JSON.parse(xhr.response);
                        if (_this2.events.imgUploaded && json.url.match(/http.*/)) {
                            _this2.events.imgUploaded(json);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    console.log('An error occurred while uploading the file...Try again');
                }
            };

            // Send the Data.
            xhr.send(formData);
        }
    }]);

    return MenuHandler;
}();

exports.default = MenuHandler;

/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map