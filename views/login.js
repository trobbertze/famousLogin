LoginView = function(kwargs){
  // Famous Modules
  require("famous/core/famous");
  var View             = require('famous/core/View');
  var Surface          = require('famous/core/Surface');
  var RenderNode       = require('famous/core/RenderNode');
  var SequentialLayout = require('famous.views/SequentialLayout');
  var InputSurface     = require('famous.surfaces/InputSurface');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var Utility          = require('famous/utilities/Utility');

  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _LoginView(kwargs) {
    View.apply(this);

    this.form = new SequentialLayout({
      direction: Utility.Direction.Y,
    });

    this.title = new Surface({
      size: [200, 50],
      classes: [
        "FL",
        "FLlogin",
        "title"
      ],
      content: "Tjomma"
    });

    this.userName = new InputSurface({
      classes: [
        "FL",
        "FLlogin",
        "form-control",
        "userName"
      ],
      type: "text",
      size: [200, 50],
      placeholder: "username"
    });

    this.password = new InputSurface({
      classes: [
        "FL",
        "FLlogin",
        "form-control",
        "password"
      ],
      type: "password",
      size: [200, 50],
      placeholder: "password"
    });

    var loginButton = new Surface({
      classes: [
        "FL",
        "FLlogin",
        "btn",
        "btn-default",
        "login"
      ],
      content: "Log in",
      size: [200, 40]
    });
    loginButton.on('click', this.login.bind(this));

    var noAccountMessage = new Surface({
      classes: [
        "FL",
        "FLlogin",
        "noAccountMessage"
      ],
      content: "Don't have an account yet?",
      size: [200, 50]
    });

    var signupButton = new Surface({
      classes: [
        "FL",
        "FLlogin",
        "btn",
        "btn-default",
        "signup"
      ],
      content: "Sign up",
      size: [200, 40]
    });
    signupButton.on('click', this.signup.bind(this));

    var modifier = new StateModifier({
      // align: [0.5, 0.5],
      // origin: [0.5, 0.5]
    });

    this.form.sequenceFrom(
      [
        this.title,
        this.userName,
        this.password,
        loginButton,
        noAccountMessage,
        signupButton
      ]
    );

    this.add(modifier).add(this.form);

    this.progress = new ProgressIndicator();

  }
  // ---------------------------------------------------------------------------
  _LoginView.prototype = Object.create(View.prototype);
  _LoginView.prototype.constructor = _LoginView;
  // ---------------------------------------------------------------------------
  _LoginView.prototype.signup = function(evt) {
    this._eventOutput.emit('clickSignup');
  };
  // ---------------------------------------------------------------------------
  _LoginView.prototype.login = function(evt) {

    this.progress.show();
    this._eventOutput.emit('clickLogin');
  };
  // ---------------------------------------------------------------------------
  return new _LoginView(kwargs);
};
