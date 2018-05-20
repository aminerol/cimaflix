import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['seasons'].default;

crudRouter.route('/seasons/get').get((req, res) => {
  
  model.find((err, ms) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(ms);
    }
  });
});


crudRouter.route('/seasons/post').post((req, res) => {
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
