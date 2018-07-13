import { Router } from "express";
import * as NodeCache from "node-cache";

const ttl = 60 * 60 * 24 * 30;
var cache = new NodeCache({
  stdTTL: ttl,
  checkperiod: ttl * 0.2,
  useClones: false
});

const crudRouter = Router();
const models = require("require-all")({
  dirname: __dirname + "/../models",
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models["seasons"].default;

crudRouter.route("/:serieid/seasons/get").get((req, res) => {
  const key = `getSeasonsOfaSerie_${req.params.serieid}`;
  let value = cache.get(key);
  if (value) {
    res.json(value);
  } else {
    model.find({ serieid: req.params.serieid }).exec((err, ms) => {
      if (err) {
        cache.set(key, { error: err });
        res.json({ error: err });
      } else {
        cache.set(key, { items: ms });
        res.json({ items: ms });
      }
    });
  }
});

crudRouter.route("/seasons/post").post((req, res) => {
  const m = new model();
  Object.assign(m, req.body);
  model.find({ slug: m.slug, serieid: m.serieid }).exec(function(err, docs) {
    if (docs.length) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json(docs[0]);
      }
    } else {
      m.save(err => {
        if (err) {
          res.json({ error: err });
        } else {
          cache.del(`getSeasonsOfaSerie_${m.serieid}`);
          res.json(m);
        }
      });
    }
  });
});

export default crudRouter;
