import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import "rxjs/add/operator/map";

@Injectable()
export class EpisodeService {

  constructor(private _http: Http) {
  }

  getPopularEpisodes(){
    return this._http.get('http://localhost:4200/api/episodes/popular/get/').map(res => res.json());
  }

  getLatestEpisodes(page: Number){
    return this._http.get('http://localhost:4200/api/episodes/get/'+page).map(res => res.json());
  }

}
