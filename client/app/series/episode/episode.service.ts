import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import "rxjs/add/operator/map";
import { environment } from '../../../environments/environment';

@Injectable()
export class EpisodeService {

  constructor(private _http: Http) {
  }

  getPopularEpisodes(){
    return this._http.get(environment.apiEndpoint+'episodes/popular/get/').map(res => res.json());
  }

  getLatestEpisodes(page: Number){
    return this._http.get(environment.apiEndpoint+'episodes/get/'+page).map(res => res.json());
  }

}
