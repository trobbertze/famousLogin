FamousLogin = function(options){
  // Famous Modules
  require("famous/core/famous");
  var View        = require('famous/core/View');
  var Lightbox    = require('famous.views/Lightbox');
  var Transform   = require('famous/core/Transform');
  var Utility     = require('famous/utilities/Utility');
  var Easing      = require('famous/transitions/Easing');

  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _FamousLogin(options) {
    View.apply(this);

    this.lightbox = new Lightbox({
      inOpacity: 1,
      outOpacity: 0,
      inTransform: Transform.translate(320,0, 0),
      outTransform: Transform.translate(-320, 0, 1),
      inTransition: { duration: 400, curve: Easing.outBack },
      outTransition: { duration: 400, curve: Easing.easeOut }
    });

    this.add(this.lightbox);

    this.loginView = new LoginView();
    this.loginView.on("clickSignup", this.showSignup.bind(this));

    this.signupView = new SignupView();
    this.signupView.on("returnToLogin", this.showLogin.bind(this));

    this.showLogin();
  }
  // ---------------------------------------------------------------------------
  _FamousLogin.prototype = Object.create(View.prototype);
  _FamousLogin.prototype.constructor = _FamousLogin;
  // ---------------------------------------------------------------------------
  _FamousLogin.prototype.showLogin = function() {
    this.lightbox.show(this.loginView);
  };
  // ---------------------------------------------------------------------------
  _FamousLogin.prototype.showSignup = function() {
    this.lightbox.show(this.signupView);
  };
  // ---------------------------------------------------------------------------
  return new _FamousLogin(options);
};
