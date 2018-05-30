import * as mongoose from 'mongoose';

export interface ICategory {
  catId: Number;
  name: String;
  slug: String;
};

const CategorySchema = new mongoose.Schema({
  catId: Number,
  name: String,
  slug: String,
});

interface ICategoryModel extends ICategory, mongoose.Document { }

const Category = mongoose.model<ICategoryModel>('Category', CategorySchema);

export default Category;
