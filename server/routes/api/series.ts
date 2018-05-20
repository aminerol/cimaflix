import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['series'].default;

crudRouter.route('/series/get/:page').get((req, res) => {

  var perPage = 9
  var page = req.params.page || 1

  model
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, ms) {
      model.count().exec(function (err, count) {
        if (err) {
          res.json({ error: err });
        } else {
          res.json(ms);
        }
      });
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
