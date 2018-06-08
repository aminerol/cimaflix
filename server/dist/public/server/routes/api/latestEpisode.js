"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crudRouter = express_1.Router();
var models = require('require-all')({
    dirname: __dirname + '/../../models',
    filter: /^([^\.].*)\.(ts|js)$/
});
var model = models['latestEpisodes'].default;
// return count and episodes  with pagination
crudRouter.route('/episodes/get/:page').get(function (req, res) {
    var perPage = 6 * 5;
    var page = req.params.page || 1;
    model
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, ms) {
        model.find().count().exec(function (err, count) {
            if (err) {
                res.json({ error: err });
            }
            else {
                res.json({ items: ms, total: count });
            }
        });
    });
});
crudRouter.route('/episodes/popular/get').get(function (req, res) {
    model.find().sort({ date: -1 }).limit(20).exec(function (err, ms) {
        if (err) {
            res.json({ error: err });
        }
        else {
            res.json({ items: ms });
        }
    });
});
crudRouter.route('/episodes/latest/post').post(function (req, res) {
    var m = new model();
    Object.assign(m, req.body);
    model.find({ serieSlug: m.serieSlug, seasonSlug: m.seasonSlug, episodeSlug: m.episodeSlug }).exec(function (err, docs) {
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
//# sourceMappingURL=latestEpisode.js.map