"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
;
var serieSchema = new mongoose.Schema({
    title: String,
    slug: String,
    hash: { type: String, min: 7, max: 7 },
    poster: String,
    sypnosis: String,
    year: Number,
    genre: String,
    actors: String,
    rate: Number,
    type: Number,
    date: { type: Date, default: Date.now }
});
var Serie = mongoose.model('Serie', serieSchema);
exports.default = Serie;
//# sourceMappingURL=series.js.map