import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['series'].default;

//return count and only 12 serie from given categorie
crudRouter.route('/categories/get/:catid').get((req, res) => {

  var perPage = 12
  var catId = req.params.catid

  model
    .find({ type: catId }, { slug: 1, title: 1, poster: 1 })
    .limit(perPage)
    .exec(function (err, ms) {
      model.count().exec(function (err, count) {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({ items: ms, total: count });
        }
      });
    });
});

// return count and series from given category with pagination
crudRouter.route('/series/get/:catid/:page').get((req, res) => {

  res.json({ succes: 'DONE' });

  /*var perPage = 6 * 5
  var page = req.params.page || 1
  var catid = req.params.catid

  model
    .find({ type: catid }, { slug: 1, title: 1, poster: 1 })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, ms) {
      model.find({ type: catid }).count().exec(function (err, count) {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({ items: ms, total: count });
        }
      });
    });*/
});

// return all info and seasons and episodes of a serie
crudRouter.route('/serie/:catid/:slug/get').get((req, res) => {
  model
    .find({ slug: req.params.slug }).limit(1)
    .exec(function (err, ms) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ items: ms });
      }
    });
});

//return releated series of a given category and serie
crudRouter.route('/:catid/releated/get').get((req, res) => {
  model.find({ type: req.params.catid }, { slug: 1, title: 1 }).limit(10).exec(function (err, series) {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ items: series });
    }
  });
});


crudRouter.route('/series/post').post((req, res) => {
  const m = new model();
  Object.assign(m, req.body);
  model.find({ slug: m.slug}).exec(function (err, docs) {
    if (docs.length) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json(docs);
      }
    }else{
      m.save((err) => {
        if (err) {
          res.json({ error: err });
        } else {
          res.json(m);
        }
      });
    }
  });
})


export default crudRouter;
