import { Router } from "express";
import * as NodeCache from "node-cache";

const ttl = 60 * 60 * 24 * 365; //hour;
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
const model = models["links"].default;

crudRouter.route("/:episodeid/links/get").get((req, res) => {
  const key = `getLinksOfanEpisode_${req.params.episodeid}`;
  let value = cache.get(key);
  if (value) {
    res.json(value);
  } else {
    model.find({ episodeid: req.params.episodeid }).exec((err, ms) => {
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

crudRouter.route("/:episodeid/links/delete").post((req, res) => {
  model.remove({ episodeid: req.params.episodeid }, function(err) {
    if (!err) {
      res.json({ succes: 'deleted' });
    }
    else {
      res.json({ error: err });
    }
  });
});

crudRouter.route("/links/post").post((req, res) => {
  const m = new model();
  Object.assign(m, req.body);
  model.find({ episodeid: m.episodeid, url: m.url }).exec(function(err, docs) {
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
          cache.del(`getLinksOfanEpisode_${m.episodeid}`);
          res.json(m);
        }
      });
    }
  });
});

export default crudRouter;
