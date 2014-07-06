SignupView = function(kwargs){
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
  function _SignupView(kwargs) {
    View.apply(this);

    this.control = new SignupControl();

    this.form = new SequentialLayout({
      direction: Utility.Direction.Y,
    });

    var title = new Surface({
      size: [200, 50],
      classes: [
        "FL",
        "FLsignup",
        "title"
      ],
      content: "Tjomma"
    });

    this.username = new InputSurface({
      classes: [
        "FL",
        "FLsignup",
        "form-control"
      ],
      type: "text",
      size: [200, 50],
      placeholder: "username"
    });

    var spacer = new Surface({
      size: [10, 10]
    });

    this.password = new InputSurface({
      classes: [
        "FL",
        "FLsignup",
        "form-control",
        "password"
      ],
      type: "password",
      size: [200, 50],
      placeholder: "password"
    });

    this.repeatPassword = new InputSurface({
      classes: [
        "FL",
        "FLsignup",
        "form-control",
        "repeatPassword"
      ],
      type: "password",
      size: [200, 50],
      placeholder: "repeat password"
    });

    var signupButton = new Surface({
      classes: [
        "FL",
        "FLsignup",
        "btn",
        "btn-default",
        "signup"
      ],
      content: "Sign up",
      size: [200, 40]
    });
    signupButton.on('click', this.signup.bind(this));

    var returnButton = new Surface({
      classes: [
        "FL",
        "FLsignup",
        "btn",
        "btn-default",
        "return"
      ],
      content: "Return to log in",
      size: [200, 40]
    });
    returnButton.on('click', this.returnToLogin.bind(this));

    var modifier = new StateModifier({
      align: [0.5, 0.5],
      origin: [0.5, 0.5]
    });

    this.form.sequenceFrom(
      [
        title,
        this.username,
        spacer,
        this.password,
        this.repeatPassword,
        spacer,
        signupButton,
        spacer,
        returnButton
      ]
    );

    this.add(modifier).add(this.form);

  }
  // ---------------------------------------------------------------------------
  _SignupView.prototype = Object.create(View.prototype);
  _SignupView.prototype.constructor = _SignupView;
  // ---------------------------------------------------------------------------
  _SignupView.prototype.signup = function(evt) {
    this.control.register(
      {
        username: this.username.getValue(),
        password: this.password.getValue()
      },
      this.signupComplete.bind(this)
    );
  };
  // ---------------------------------------------------------------------------
  _SignupView.prototype.signupComplete = function(err) {
    Session.set("loggedin", true);
  };
  // ---------------------------------------------------------------------------
  _SignupView.prototype.returnToLogin = function(evt) {
    this._eventOutput.emit('returnToLogin');
  };
  // ---------------------------------------------------------------------------
  return new _SignupView(kwargs);
};
