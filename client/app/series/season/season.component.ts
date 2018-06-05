import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/categorie';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SerieService } from '../serie/serie.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: '',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  categorie: Category;
  serie: any;
  season: any;
  seasons: any[] = [];
  episodes: any[] = [];
  tags: String;

  serieslug: any;
  catslug: any;
  seasonslug: any;
  
  constructor(private _route: ActivatedRoute, private _serieService: SerieService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(param => {

      this.serieslug = param.get('serieslug');
      this.catslug = param.get('catslug');
      this.seasonslug = param.get('seasonslug');

      this.categorie = environment.categories.find(cat => cat.slug == this.catslug);
      
      this._serieService.getSerieInfo(this.serieslug, this.categorie.catId).subscribe(data =>{
        this.serie = data.items[0];

        this._serieService.getSerieSeasons(this.serie._id).subscribe(data => { 
          this.seasons = data.items;
          this.season = this.seasons.find(se => se.slug == this.seasonslug);
          this.tags = environment.seasontags.replace(/{{serie.title}}/g, this.serie.title).replace(/{{season.number}}/g, this.season.number);
          this._serieService.getSerieEpisodes(this.season._id).subscribe(data => { 
            this.episodes = data.items; 
          }); 
        }); 
      });

    });
  }

}
