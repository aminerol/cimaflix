import { ISerie } from "../../../server/models/series";

export class Serie implements ISerie {
  title: String;
  slug: String;
  catSlug: String;
  hash: String;
  poster: String;
  sypnosis: String;
  year: Number;
  genre: String;
  actors: String;
  rate: Number;
  date: Date;

  type: Number;
}
