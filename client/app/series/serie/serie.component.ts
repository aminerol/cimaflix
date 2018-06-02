import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerieService } from './serie.service';
import { Category } from '../../models/categorie';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  @Input('data') serie: any;
  series: any[] = [];
  categorie: Category;
  seasons: any[] = []; 
  tags: String;

  constructor(private _route: ActivatedRoute, private _serieService: SerieService) { }

  ngOnInit() {
    
    this._route.paramMap.subscribe(param => {
      var serieslug = param.get('serieslug');
      var catslug = param.get('catslug');
      this.categorie = environment.categories.find(cat => cat.slug == catslug);
      this.tags = environment.serietags;

      this._serieService.getSerieInfo(serieslug, this.categorie.catId).subscribe(data => { 
        this.serie = data.items[0]; 
        Observable.forkJoin( 
          this._serieService.getReleatedSeries(this.categorie.catId), 
          this._serieService.getSerieSeasons(this.serie._id) 
        ).subscribe(data => { 
          this.series = data[0].items; 
          this.seasons = data[1].items; 
        }); 
      });
    });
  }
}
