import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['episodes'].default;

crudRouter.route('/:seasonid/episodes/get').get((req, res) => {

  model.find({ seasonid: req.params.seasonid }).sort({ number: 1 }).exec((err, ms) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ items: ms });
    }
  });
});


crudRouter.route('/episodes/post').post((req, res) => {
  const m = new model();
  Object.assign(m, req.body);
  model.find({ slug: m.slug, serieid: m.serieid, seasonid: m.seasonid}).exec(function (err, docs) {
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
