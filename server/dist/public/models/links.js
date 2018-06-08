"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
;
exports.LinkSchema = new mongoose.Schema({
    episodeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode'
    },
    host: String,
    url: String,
    date: { type: Date, default: Date.now }
});
var Link = mongoose.model('Link', exports.LinkSchema);
exports.default = Link;
//# sourceMappingURL=links.js.map