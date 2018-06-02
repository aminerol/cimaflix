import * as mongoose from 'mongoose';
import { EpisodeSchema, IEpisode } from './episodes';

export interface ISeason {
  slug: String;
  hash: String;
  number: Number;
  views: Number;
  date: Date;
  episodes: IEpisode[];
};

export const SeasonSchema = new mongoose.Schema({
  slug: String,
  hash: String,
  number: Number,
  views: Number,
  date: { type: Date, default: Date.now },
  episodes: [EpisodeSchema]
});

interface ISeasonModel extends ISeason, mongoose.Document { }

const Season = mongoose.model<ISeasonModel>('Season', SeasonSchema);

export default Season;
