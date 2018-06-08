"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
;
exports.LatestEpisodeSchema = new mongoose.Schema({
    serieTitle: String,
    serieSlug: String,
    seriePoster: String,
    serieViews: Number,
    catSlug: String,
    seasonSlug: String,
    seasonNumber: Number,
    seasonViews: Number,
    episodeSlug: String,
    episodeNumber: Number,
    episodeViews: Number,
    date: { type: Date, default: Date.now },
});
var LatestEpisode = mongoose.model('LatestEpisode', exports.LatestEpisodeSchema);
exports.default = LatestEpisode;
//# sourceMappingURL=latestEpisodes.js.map