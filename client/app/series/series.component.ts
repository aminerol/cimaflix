import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SeriesService } from './series.service';
import { Category } from '../models/categorie';
import { environment } from '../../environments/environment'

@Component({
  selector: '',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private _serieService: SeriesService) {

  }

  ngOnInit() {
    this.categories = environment.categories;
    for(let categorie of this.categories){
      this._serieService.getSeries(categorie.catId).subscribe( data => 
        categorie.series = data.items);
    }  
  }

}
