import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Category } from '../../models/categorie';
import { SerieService } from '../serie/serie.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: '',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit, AfterViewInit {

  @ViewChild("player", {read: ElementRef}) player: ElementRef;
  
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

  iframe: String;
  
  constructor(private _route: ActivatedRoute, private _serieService: SerieService) 
  { }

  ngAfterViewInit() {
    
}

  ngOnInit() {
    this._route.paramMap.subscribe(param => {

      if(this.player){
        this.player.nativeElement.innerHTML = '<div class="loader2"></div><div class="bwac-btn"><i class="glyphicon glyphicon-play"></i></div>';      
      }

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

  public LoadIframeInit() {
    this.player.nativeElement.innerHTML = '<div class="embed-responsive embed-responsive-16by9 mb-3"><iframe scrolling="no" class="embed-responsive-item" src="'+this.links[0].url+'" allowfullscreen=""></iframe></div>';
  }
  public LoadIframe(link: any) {
    this.player.nativeElement.innerHTML = '<div class="embed-responsive embed-responsive-16by9 mb-3"><iframe scrolling="no" class="embed-responsive-item" src="'+link.url+'" allowfullscreen=""></iframe></div>';    
  }

}
