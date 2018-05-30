import { Router } from 'express';

const crudRouter = Router();
const models = require('require-all')({
  dirname: __dirname + '/../../models',
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models['series'].default;


crudRouter.route('/categories/get/:catid').get((req, res) => {

  var perPage = 12
  var catId = req.params.catid

  model
    .find({ type: catId })
    .limit(perPage)
    .exec(function (err, ms) {
      model.count().exec(function (err, count) {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({items: ms, total: count});
        }
      });
    });
});

export default crudRouter;
