import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISerie } from '../../../../server/models/series';
import { CategorieService } from './categorie.service';
import { environment } from '../../../environments/environment'
import { Category } from '../../models/categorie';

@Component({
  selector: '',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categorie: Category;
  currentpage: number = 1;
  total: number;
  @Input('data') series: ISerie[] = [];
  
  constructor(private route: ActivatedRoute, private _categorieService: CategorieService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.categorie = environment.categories.find(cat => cat.slug == param.get('slug'));
      this.getPage(1, this.categorie.catId);
    });
    
  }

  getPage(page: number, catid: Number) {
    this._categorieService.getSerieOfCategorie(page, catid).subscribe(
      data => {
        this.total = data.total;
        this.series = data.items;
        this.currentpage = page;
      }
    )
  }
}
