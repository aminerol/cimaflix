"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crudRouter = express_1.Router();
var models = require('require-all')({
    dirname: __dirname + '/../../models',
    filter: /^([^\.].*)\.(ts|js)$/
});
var model = models['seasons'].default;
crudRouter.route('/:serieid/seasons/get').get(function (req, res) {
    model.find({ serieid: req.params.serieid }).exec(function (err, ms) {
        if (err) {
            res.json({ error: err });
        }
        else {
            res.json({ items: ms });
        }
    });
});
crudRouter.route('/seasons/post').post(function (req, res) {
    var m = new model();
    Object.assign(m, req.body);
    model.find({ slug: m.slug, serieid: m.serieid }).exec(function (err, docs) {
        if (docs.length) {
            if (err) {
                res.json({ error: err });
            }
            else {
                res.json(docs);
            }
        }
        else {
            m.save(function (err) {
                if (err) {
                    res.json({ error: err });
                }
                else {
                    res.json(m);
                }
            });
        }
    });
});
exports.default = crudRouter;
//# sourceMappingURL=seasons.js.map