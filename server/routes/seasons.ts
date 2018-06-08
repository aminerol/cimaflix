import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['seasons'].default;

crudRouter.route('/:serieid/seasons/get').get((req, res) => {

  model.find({ serieid: req.params.serieid}).exec((err, ms) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({items: ms});
    }
  });
});


crudRouter.route('/seasons/post').post((req, res) => {
  const m = new model();
  Object.assign(m, req.body);
  model.find({ slug: m.slug, serieid: m.serieid}).exec(function (err, docs) {
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
