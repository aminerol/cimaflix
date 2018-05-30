import { ICategory } from '../../../server/models/categories';

export class Category implements ICategory {

    catId: Number;
    name: String;
    slug: String;
    series: any[] = [];

    constructor(_catId, _name, _slug){
        this.catId = _catId;
        this.name = _name;
        this.slug = _slug;
    }
}
