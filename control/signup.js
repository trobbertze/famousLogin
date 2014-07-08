SignupControl = function(){

};
// ---------------------------------------------------------------------------
SignupControl.prototype.constructor = SignupControl;
// ---------------------------------------------------------------------------
SignupControl.prototype.register = function(options, callback) {
  Accounts.createUser(
    {
      username: options.username,
      password: options.password
    },
    this.registerComplete.bind(this, callback)
  );
};
// ---------------------------------------------------------------------------
SignupControl.prototype.registerComplete = function(callback, err){
  if (callback) {
    callback(err);
  }
  if (!err){
    Events().emit("login");
  }
};
