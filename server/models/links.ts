import * as mongoose from 'mongoose';

export interface ILink {
  episodeid: any;
  host: String;
  url: String;
  date: Date;
};

const LinkSchema = new mongoose.Schema({
  episodeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode'
  },
  host: String,
  url: String,
  date: { type: Date, default: Date.now }
});

interface ILinkModel extends ILink, mongoose.Document { }

const Link = mongoose.model<ILinkModel>('Link', LinkSchema);

export default Link;
