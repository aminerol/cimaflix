import { Router } from "express";
import { environment } from "../../client/environments/environment";
const sitemap = require("sitemap");
import * as NodeCache from "node-cache";
const crudRouter = Router();

const sitemaptTtl = 60 * 60 * 24 * 30;
var sitemapCache = new NodeCache({
  stdTTL: sitemaptTtl,
  checkperiod: sitemaptTtl * 0.2,
  useClones: false
});

const sitemapEptTtl = 60 * 60 * 24;
var sitemapEpCache = new NodeCache({
  stdTTL: sitemapEptTtl,
  checkperiod: sitemapEptTtl * 0.2,
  useClones: false
});

const models = require("require-all")({
  dirname: __dirname + "/../models",
  filter: /^([^\.].*)\.(ts|js)$/
});
const model = models["latestEpisodes"].default;

crudRouter.route("/sitemap.xml").get((req, res) => {
  const key = `getSitemapIndex`;
  let value = sitemapCache.get(key);
  if (value) {
    res.type("application/xml");
    res.header("Content-Type", "application/xml");
    res.send(value);
  } else {
    model
      .aggregate({
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          entries: { $push: "$$ROOT" }
        }
      })
      .exec(function(err, result) {
        let sitemapData = sitemap.buildSitemapIndex({
          urls: result.map(
            element =>
              `${environment.Endpoint}api/sitemap-episodes-${element._id.year}-${
                element._id.month
              }.xml`
          )
        });
        sitemapCache.set(key, sitemapData);
        res.type("application/xml");
        res.header("Content-Type", "application/xml");
        res.send(sitemapData);
      });
  }
});

crudRouter.route(/^\/sitemap-episodes-(\w+)-(\w+)\.xml?$/).get((req, res) => {
  const key = `getSitemapEpisodes_${req.params[0]}_${req.params[1]}`;
  let value = sitemapEpCache.get(key);
  if (value) {
    res.header("Content-Type", "application/xml");
    res.send(value);
  } else {
    model.find(
      {
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, parseInt(req.params[0])] },
            { $eq: [{ $month: "$date" }, parseInt(req.params[1])] }
          ]
        }
      },
      (err, result) => {
        const urlss: any[] = [];
        result.forEach(episode => {
          urlss.push({
            url: `${episode.catSlug}/${episode.serieSlug}/${
              episode.seasonSlug
            }/${episode.episodeSlug}`,
            changefreq: "monthly",
            priority: 0.7
          });
        });
        let sitemapData = sitemap.createSitemap({
          hostname: environment.Endpoint,
          cacheTime: 600000,
          urls: urlss
        });
        sitemapData.toXML(function(err, xml) {
          if (err) {
            res.send(err);
          }
          sitemapEpCache.set(key, xml);
          res.header("Content-Type", "application/xml");
          res.send(xml);
        });
      }
    );
  }
});

export default crudRouter;
