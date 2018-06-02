import * as mongoose from 'mongoose';

export interface ILink {
  host: String;
  url: String;
  date: Date;
};

export const LinkSchema = new mongoose.Schema({
  host: String,
  url: String,
  date: { type: Date, default: Date.now }
});

interface ILinkModel extends ILink, mongoose.Document { }

const Link = mongoose.model<ILinkModel>('Link', LinkSchema);

export default Link;
