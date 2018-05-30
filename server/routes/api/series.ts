import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['series'].default;


crudRouter.route('/series/get/:catid/:page').get((req, res) => {

  var perPage = 6*5
  var page = req.params.page || 1
  var catid = req.params.catid

  model
    .find({ type: catid })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, ms) {
      model.find({ type: catid }).count().exec(function (err, count) {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({items: ms, total: count});
        }
      });
    });
});

crudRouter.route('/serie/:catid/:slug/get').get((req, res) => {
    model
      .find({ slug: req.params.slug }).limit(1)
      .exec(function (err, ms) {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({items: ms});
        }
      });
  });

  crudRouter.route('/:catid/:serieid/releated/get').get((req, res) => {
    model.find({ type: req.params.catid}, {slug: 1, title: 1}).limit(10).exec(function (err, series) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({items: series});
      }
    });
  });


crudRouter.route('/series/post').post((req, res) => {
  const m = new model();
  Object.assign(m, req.body);
  m.save((err) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(m);
    }
  });
})


export default crudRouter;
