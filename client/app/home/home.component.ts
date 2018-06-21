import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EpisodeService } from '../series/episode/episode.service';
import { Category } from '../models/categorie';
import { ILatestEpisode } from '../../../server/models/latestEpisodes';

@Component({
  selector: '',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliderOptions = {items: 6, 
    dots: true, 
    nav : true, 
    lazyLoad: true,
    autoplay: true,
    slideBy : 2 ,
    margin :14 ,
    responsive: { '0': {  items: 2, margin: 5 },
                  '480': { items: 4,  margin: 5 },
                  '640': { items: 6, margin: 5 }
    }  
  }
  popularEpisodes: ILatestEpisode[] = [];
  latestEpisodes: ILatestEpisode[] = [];
  catSlug: String;
  currentpage: number = 1;
  total: number;

  constructor(private _episodeService: EpisodeService) {
  }

  ngOnInit() {

    this.getPage(1);
    this._episodeService.getPopularEpisodes().subscribe(data => {
      this.popularEpisodes = data.items;
    })
  }

  getPage(page: number) {
    this._episodeService.getLatestEpisodes(page).subscribe(
      data => {
        this.total = data.total;
        this.latestEpisodes = data.items;
        this.currentpage = page;
      }
    )
  }

}
