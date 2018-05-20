import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['episodes'].default;

crudRouter.route('/episodes/get').get((req, res) => {
  
  model.find((err, ms) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(ms);
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
