import * as mongoose from 'mongoose';

export interface ISeason {
  serieid: any;
  slug: String;
  hash: String;
  number: Number;
  views: Number;
  date: Date;
};

const SeasonSchema = new mongoose.Schema({
  serieid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Serie'
  },
  slug: String,
  hash: String,
  number: Number,
  views: Number,
  date: { type: Date, default: Date.now }
});

interface ISeasonModel extends ISeason, mongoose.Document { }

const Season = mongoose.model<ISeasonModel>('Season', SeasonSchema);

export default Season;
