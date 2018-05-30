import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/categorie';
import { SerieService } from '../serie/serie.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: '',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {

  categorie: Category;
  serie: any;
  season: any;
  seasons: any[] = [];
  episode: any;
  episodes: any[] = [];
  links: any[] = [];
  tags: String;

  serieslug: any;
  catslug: any;
  seasonslug: any;
  episodeslug: any;
  
  constructor(private _route: ActivatedRoute, private _serieService: SerieService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(param => {
      this.serieslug = param.get('serieslug');
      this.catslug = param.get('catslug');
      this.seasonslug = param.get('seasonslug');
      this.episodeslug = param.get('episodeslug');

      this.categorie = environment.categories.find(cat => cat.slug == this.catslug);
      this.tags = environment.episodetags;
      
      this._serieService.getSerieInfo(this.serieslug, this.categorie.catId).subscribe(data =>{
        this.serie = data.items[0];

        this._serieService.getSerieSeasons(this.serie._id).subscribe(data => {
          this.seasons = data.items;
          this.season = this.seasons.find(se => se.slug == this.seasonslug);
          this._serieService.getSerieEpisodes(this.serie._id, this.season._id).subscribe(data => {
            this.episodes = data.items;
            this.episode = this.episodes.find(ep => ep.slug == this.episodeslug);
            this._serieService.getEpisodeLinks(this.episode._id).subscribe(data => {
              this.links = data.items;
            });
          });
        });
      });

    });
  }

}
