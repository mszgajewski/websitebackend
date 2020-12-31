'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

/*
app.models.user.find((err, result) => {
  if (result.length === 0) {
    const user = {
      email: 'mszgajewski@gmail.com',
      password: 'test',
      username: 'msz',
    };

    app.models.user.create(user, (err, result)=> {
      console.log("Proba stworzenia urzytkownika", err, result); 
    }); 
  }
}); */

app.models.user.afterRemote('create', (ctx, user, next) => {
  console.log("Nowy user to", user);
  app.models.Profile.create({
    first_name: user.username,
    name: user.name,
    created_at: new Date(),
    userId: user.id,
    role: 'subscriber'
  }, (err, result) => {
    if(!err && result) {
      console.log("Stworzono nowego uzytkownika", result); 
    }else{
      console.log("Wystąpił błąd", err);
    }
    next();
  }); 
});

app.models.Role.find({where: {name: 'admin'}}, (err,role) => {
  if (!err && role) {
    console.log('Bez błędu rola to', role);
    if (role.length === 0) {
      app.models.Role.create({
        name: 'admin',
      }, (err2, result) => {
        if (!err2 && result) {


            app.models.user.findOne((usererr, user) => {
              if (!usererr && user) {
                result.principals.create({
                  principalType: app.models.RoleMapping.USER,
                  principalId: user.id,
                }, (err3, principal) => {
                  console.log("Stworzony główny", err3, principal);
                });
              }
            });
           }
        });
    }
  }
});

app.models.Role.find({where: {name: 'editor'}}, (err, roles) => {
  if (!err && roles) {
    if (roles.length === 0) {
      app.models.Role.create({
        name: 'editor',
      }, (creationErr, result) => {
          console.log(creationErr, result);   
      });
    }
  }
});

