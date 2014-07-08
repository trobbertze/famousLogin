LoginControl = function(){

};
// ---------------------------------------------------------------------------
LoginControl.prototype.constructor = LoginControl;
// ---------------------------------------------------------------------------
LoginControl.prototype.login = function(options, callback) {
  Meteor.loginWithPassword(
    options.username,
    options.password,
    this.loginComplete.bind(this, callback)
  );
};
// ---------------------------------------------------------------------------
LoginControl.prototype.loginComplete = function(callback, err){
  if (callback) {
    callback(err);
  }
  if (!err){
      Events().emit("login");
  }
};
