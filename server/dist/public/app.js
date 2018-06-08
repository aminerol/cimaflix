"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
require('mongoose').Promise = require('bluebird');
// import index from './routes/index';
// import users from './routes/users';
var app = express();
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', index);
// app.use('/users', users);
// routes
var routeModules = require('require-all')({
    dirname: __dirname + '/routes',
    filter: function (filename) {
        filename = filename.toLowerCase();
        if ((filename.endsWith('.ts') && !filename.endsWith('.spec.ts'))
            || (filename.endsWith('.js') && !filename.endsWith('.spec.js'))) {
            return filename.substr(0, filename.length - 3);
        }
    },
    map: function (name) { return '/' + name; }
});
function resolve(root, modules) {
    for (var _i = 0, _a = Object.keys(modules); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        if (!name_1.startsWith('/')) {
            return;
        }
        var module_1 = modules[name_1];
        if (module_1.default && module_1.default.route) {
            console.log("Add router " + (root + name_1));
            var router = module_1.default;
            app.use(root, router);
        }
        else {
            resolve(root + name_1, module_1);
        }
    }
}
resolve('', routeModules);
// Default to main page, angular route takes over
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   var err = new Error('Not Found');
//   err['status'] = 404;
//   next(err);
// });
// // error handlers
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use((error: any, req, res, next) => {
//     res.status(error['status'] || 500);
//     res.render('error', {
//       message: error.message,
//       error
//     });
//   });
// }
// // production error handler
// // no stacktraces leaked to user
// app.use((error: any, req, res, next) => {
//   res.status(error['status'] || 500);
//   res.render('error', {
//     message: error.message,
//     error: {}
//   });
//   return null;
// });
exports.default = app;
// Connect to MongoDB
mongoose.connect('mongodb://localhost/cimaflix', { useMongoClient: true })
    .then(function () {
    console.log('MongoDB connected');
})
    .catch(function () {
    console.log('unable to connect to mongoDB');
});
// mongoose.connect('mongodb://localhost/test');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('openUri', () => {
//   console.log('MongoDB connected');
// });
//# sourceMappingURL=app.js.map