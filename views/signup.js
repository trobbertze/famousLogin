SignupView = function(kwargs){
  // Famous Modules
  require("famous/core/famous");
  var View             = require('famous/core/View');
  var Surface          = require('famous/core/Surface');
  var RenderNode       = require('famous/core/RenderNode');
  var Transform        = require('famous/core/Transform');
  var SequentialLayout = require('famous.views/SequentialLayout');
  var InputSurface     = require('famous.surfaces/InputSurface');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var Utility          = require('famous/utilities/Utility');
  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _SignupView(kwargs) {
    View.apply(this);

    this._control = new SignupControl();

    this.form = new SequentialLayout({
      direction: Utility.Direction.Y,
    });

    var title = new Surface({
      size: [200, 120],
      classes: [
        "FL",
        "FLsignup",
        "title"
      ],
      content: "<img src='img/Splashscreen.png' style='height:110px'>"
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
      origin: [0.5, 0],
      transform: Transform.translate(0, 20, 0)
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

    this.progress = new ProgressIndicator();
    this.add(this.progress);

    this.alert = new AnimatedAlert();
    this.add(this.alert);

  }
  // ---------------------------------------------------------------------------
  _SignupView.prototype = Object.create(View.prototype);
  _SignupView.prototype.constructor = _SignupView;
  // ---------------------------------------------------------------------------
  _SignupView.prototype.signup = function(evt) {
    this.progress.show();
    this._control.register(
      {
        username: this.username.getValue(),
        password: this.password.getValue()
      },
      this.signupComplete.bind(this)
    );
  };
  // ---------------------------------------------------------------------------
  _SignupView.prototype.signupComplete = function(err) {
    this.progress.hide();
    if (err) {
      this.alert.show(err.reason);
    }
  };
  // ---------------------------------------------------------------------------
  _SignupView.prototype.returnToLogin = function(evt) {
    this._eventOutput.emit('returnToLogin');
  };
  // ---------------------------------------------------------------------------
  return new _SignupView(kwargs);
};
