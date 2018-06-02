import * as mongoose from 'mongoose';
import { LinkSchema, ILink } from './links';

export interface IEpisode {
  slug: String;
  hash: String;
  number: Number;
  views: Number;
  date: Date;
  links: ILink[]
};

export const EpisodeSchema = new mongoose.Schema({
  slug: String,
  hash: String,
  number: Number,
  views: Number,
  date: { type: Date, default: Date.now },
  links: [LinkSchema]
});

interface IEpisodeModel extends IEpisode, mongoose.Document { }

const Episode = mongoose.model<IEpisodeModel>('Episode', EpisodeSchema);

export default Episode;
