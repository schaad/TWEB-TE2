var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    myPort = process.env.PORT || 3000;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'app2'
    },
    port: myPort,
  },

  test: {
    root: rootPath,
    app: {
      name: 'app2'
    },
    port: myPort,
  },

  production: {
    root: rootPath,
    app: {
      name: 'app2'
    },
    port: myPort,
  }
};

module.exports = config[env];
