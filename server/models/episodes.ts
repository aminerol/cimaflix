import * as mongoose from 'mongoose';

export interface IEpisode {
  seasonid: any; 
  serieid: any; 
  slug: String;
  hash: String;
  number: Number;
  views: Number;
  date: Date;
};

export const EpisodeSchema = new mongoose.Schema({
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

interface IEpisodeModel extends IEpisode, mongoose.Document { }

const Episode = mongoose.model<IEpisodeModel>('Episode', EpisodeSchema);

export default Episode;
