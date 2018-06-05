import * as mongoose from 'mongoose';

export interface ILatestEpisode {
  serieTitle: String;
  serieSlug: String;
  seriePoster: String;
  catSlug: String;

  seasonSlug: String;
  seasonNumber: Number;

  episodeSlug: String;
  episodeNumber: Number;
  episodeViews: Number;

  date: Date;
};

export const LatestEpisodeSchema = new mongoose.Schema({
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

interface ILatestEpisodeModel extends ILatestEpisode, mongoose.Document { }

const LatestEpisode = mongoose.model<ILatestEpisodeModel>('LatestEpisode', LatestEpisodeSchema);

export default LatestEpisode;
