import { Router } from "express";
import { environment } from "../../client/environments/environment";
import * as NodeCache from "node-cache";

const ttl = 60 * 60 * 1; //hour;
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
const model = models["latestEpisodes"].default;

// return count and episodes  with pagination
crudRouter.route("/episodes/get/:page").get((req, res) => {
  const key = `getLatestEpisodesWithPagination_${req.params.page}`;
  let value = cache.get(key);
  if (value) {
    res.json(value);
  } else {
    var perPage = 6 * 5;
    var page = req.params.page || 1;

    model
      .find()
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function(err, ms) {
        model
          .find()
          .count()
          .exec(function(err, count) {
            if (err) {
              cache.set(key, { error: err });
              res.json({ error: err });
            } else {
              cache.set(key, { items: ms, total: count });
              res.json({ items: ms, total: count });
            }
          });
      });
  }
});

crudRouter.route("/episodes/popular/get").get((req, res) => {
  const key = `getPopularEpisodes`;
  let value = cache.get(key);
  if (value) {
    res.json(value);
  } else {
    model
      .find()
      .sort({ date: -1 })
      .limit(20)
      .exec((err, ms) => {
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

crudRouter.route("/episodes/latest/post").post((req, res) => {
  const m = new model();
  Object.assign(m, req.body);
  model
    .find({
      serieSlug: m.serieSlug,
      seasonSlug: m.seasonSlug,
      episodeSlug: m.episodeSlug
    })
    .exec(function(err, docs) {
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
            res.json(m);
          }
        });
      }
    });
});

export default crudRouter;
