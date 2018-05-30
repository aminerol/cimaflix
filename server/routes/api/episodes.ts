import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['episodes'].default;

crudRouter.route('/:serieid/:seasonid/episodes/get').get((req, res) => {

  model.find({ serieid: req.params.serieid, seasonid: req.params.seasonid }).exec((err, ms) => {
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
  m.save((err) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(m);
    }
  });
})


export default crudRouter;
