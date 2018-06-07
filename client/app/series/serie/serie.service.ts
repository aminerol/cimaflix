import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import "rxjs/add/operator/map";
import { environment } from '../../../environments/environment';

@Injectable()
export class SerieService {

  constructor(private _http: Http) {
  }

  getSerieInfo(slug: String, catid: Number) {
    return this._http.get(environment.apiEndpoint+'serie/'+catid+'/'+slug+'/get').map(res => res.json());
  }

  getSerieSeasons(serieid: String) {
    return this._http.get(environment.apiEndpoint+''+serieid+'/seasons/get').map(res => res.json());
  }

  getSerieEpisodes(seasonid: String) { 
    return this._http.get(environment.apiEndpoint+''+seasonid+'/episodes/get').map(res => res.json());
  }

  getEpisodeLinks(episodeid: String) {
    return this._http.get(environment.apiEndpoint+''+episodeid+'/links/get').map(res => res.json());
  }

  getReleatedSeries(catid: Number) {
    return this._http.get(environment.apiEndpoint+''+catid+'/releated/get').map(res => res.json());
  }

}
