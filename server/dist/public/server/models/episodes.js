"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
;
exports.EpisodeSchema = new mongoose.Schema({
    seasonid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    },
    serieid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie'
    },
    slug: String,
    hash: String,
    number: Number,
    views: Number,
    date: { type: Date, default: Date.now },
});
var Episode = mongoose.model('Episode', exports.EpisodeSchema);
exports.default = Episode;
//# sourceMappingURL=episodes.js.map