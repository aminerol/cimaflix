import * as mongoose from 'mongoose';

export interface ISerie {
  title: String;
  slug: String;
  hash: String;
  poster: String;
  sypnosis: String;
  year: Number;
  genre: String;
  actors: String;
  rate: Number;
  type: Number;
  date: Date;
  
};

const serieSchema = new mongoose.Schema({
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

interface ISerieModel extends ISerie, mongoose.Document { }

const Serie = mongoose.model<ISerieModel>('Serie', serieSchema);

export default Serie;
