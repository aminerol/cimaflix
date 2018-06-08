"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
;
exports.SeasonSchema = new mongoose.Schema({
    serieid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie'
    },
    slug: String,
    hash: String,
    number: Number,
    date: { type: Date, default: Date.now },
});
var Season = mongoose.model('Season', exports.SeasonSchema);
exports.default = Season;
//# sourceMappingURL=seasons.js.map