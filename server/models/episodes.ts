import * as mongoose from 'mongoose';

export interface IEpisode {
  serieid: any;
  seasonid: any;
  slug: String;
  hash: String;
  number: Number;
  views: Number;
  date: Date;
};

const EpisodeSchema = new mongoose.Schema({
  serieid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Serie'
  },
  seasonid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season'
  },
  slug: String,
  hash: String,
  number: Number,
  views: Number,
  date: { type: Date, default: Date.now }
});

interface IEpisodeModel extends IEpisode, mongoose.Document { }

const Episode = mongoose.model<IEpisodeModel>('Episode', EpisodeSchema);

export default Episode;
