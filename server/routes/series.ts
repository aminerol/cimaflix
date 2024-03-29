import { Router } from "express";
import * as NodeCache from "node-cache";

const SerieTtl = 60 * 60 * 24 * 7;
var SerieCache = new NodeCache({
  stdTTL: SerieTtl,
  checkperiod: SerieTtl * 0.2,
  useClones: false
});

const crudRouter = Router();
const models = require("require-all")({
  dirname: __dirname + "/../models",
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models["series"].default;

//return count and only 12 serie from given categorie
crudRouter.route("/categories/get/:catid").get((req, res) => {
  var perPage = 12;
  var catId = req.params.catid;
  model
    .find({ type: catId }, { slug: 1, title: 1, poster: 1 })
    .limit(perPage)
    .exec(function(err, ms) {
      model.count().exec(function(err, count) {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({ items: ms, total: count });
        }
      });
    });
});

// return count and series from given category with pagination
crudRouter.get("/series/get/:catid/:page", (req, res) => {
  var perPage = 6 * 5;
  var page = req.params.page || 1;
  var catid = req.params.catid;

  model
    .find({ type: catid }, { slug: 1, title: 1, poster: 1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function(err, ms) {
      model
        .find({ type: catid })
        .count()
        .exec(function(err, count) {
          if (err) {
            res.json({ error: err });
          } else {
            res.json({ items: ms, total: count });
          }
        });
    });
});

// return all info and seasons and episodes of a serie
crudRouter.route("/serie/:catid/:slug/get").get((req, res) => {
  const key = `getSerieFromCategory_${req.params.catid}_${req.params.slug}`;
  let value = SerieCache.get(key);
  if (value) {
    res.json(value);
  } else {
    model
      .find({ slug: req.params.slug })
      .limit(1)
      .exec(function(err, ms) {
        if (err) {
          SerieCache.set(key, { error: err });
          res.json({ error: err });
        } else {
          SerieCache.set(key, { items: ms });
          res.json({ items: ms });
        }
      });
  }
});

//return releated series of a given category and serie
crudRouter.route("/:catid/releated/get").get((req, res) => {
  const key = `getReleatedSeriesFromCategory_${req.params.catid}`;
  let value = SerieCache.get(key);
  if (value) {
    res.json(value);
  } else {
    model
      .find({ type: req.params.catid }, { slug: 1, title: 1 })
      .limit(10)
      .exec(function(err, series) {
        if (err) {
          SerieCache.set(key, { error: err });
          res.json({ error: err });
        } else {
          SerieCache.set(key, { items: series });
          res.json({ items: series });
        }
      });
  }
});

// return count and series from given query with pagination
crudRouter.route("/search/:query/get/:page").get((req, res) => {
  var perPage = 6 * 5;
  var page = req.params.page || 1;
  var query = req.params.query;

  model
    .find(
      { title: { $regex: query } },
      { slug: 1, title: 1, poster: 1, type: 1 }
    )
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function(err, ms) {
      model
        .find({ title: { $regex: query } })
        .count()
        .exec(function(err, count) {
          if (err) {
            res.json({ error: err });
          } else {
            res.json({ items: ms, total: count });
          }
        });
    });
});

crudRouter.route("/series/post").post((req, res) => {
  const m = new model();
  Object.assign(m, req.body);
  model.find({ slug: m.slug }).exec(function(err, docs) {
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
