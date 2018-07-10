import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import * as logger from "morgan";
import * as mongoose from "mongoose";
require("mongoose").Promise = require("bluebird");

const app: express.Express = express();


// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
const routeModules = require("require-all")({
  dirname: __dirname + "/routes",
  filter: (filename: string) => {
    filename = filename.toLowerCase();
    if (
      (filename.endsWith(".ts") && !filename.endsWith(".spec.ts")) ||
      (filename.endsWith(".js") && !filename.endsWith(".spec.js"))
    ) {
      return filename.substr(0, filename.length - 3);
    }
  },
  map: name => "/" + name
});
function resolve(root: string, modules): void {
  for (const name of Object.keys(modules)) {
    if (!name.startsWith("/")) {
      return;
    }
    const module = modules[name];
    if (module.default && module.default.route) {
      console.log(`Add router ${root + name}`);
      const router = module.default as express.Router;
      app.use(root, router);
    } else {
      resolve(root + name, module);
    }
  }
}
resolve("", routeModules);

// Default to main page, angular route takes over
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// // catch 404 and forward to error handler

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// // error handlers

// // production error handler
// // no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  res.status(500).send({ error: error });
  return null;
});

export default app;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb://cimaflix:aminerol10@localhost:27017/cimaflix",
    { useMongoClient: true }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("unable to connect to mongoDB");
  });
