Package.describe({
  summary: "Famous style login."
});

Package.on_use(function (api, where) {
  api.use(['accounts-password'], ['client', 'server']);
  api.use(['events'], ['client', 'server']);
  api.use(['famono'], 'client');
  api.use(['progressIndicator'], 'client');
  api.use(['animatedAlert'], 'client');

  api.add_files('control/login.js', 'client');
  api.add_files('views/login.js', 'client');

  api.add_files('control/signup.js', 'client');
  api.add_files('views/signup.js', 'client');

  api.add_files('famousLogin.css', 'client');
  api.add_files('famousLogin.js', 'client');

  api.export('FamousLogin', 'client');
});

Package.on_test(function (api) {
  api.use('famousLogin');

  api.add_files('famousLogin_tests.js', 'client');
});
