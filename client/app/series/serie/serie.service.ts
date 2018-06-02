import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import "rxjs/add/operator/map";

@Injectable()
export class SerieService {

  constructor(private _http: Http) {
  }

  getSerieInfo(slug: String, catid: Number) {
    return this._http.get('http://localhost:4200/api/serie/'+catid+'/'+slug+'/get').map(res => res.json());
  }

  getSerieSeasons(serieid: String) {
    return this._http.get('http://localhost:4200/api/'+serieid+'/seasons/get').map(res => res.json());
  }

  getSerieEpisodes(serieid: String, seasonid: String) {
    return this._http.get('http://localhost:4200/api/'+serieid+'/'+seasonid+'/episodes/get').map(res => res.json());
  }

  getEpisodeLinks(episodeid: String) {
    return this._http.get('http://localhost:4200/api/'+episodeid+'/links/get').map(res => res.json());
  }

  getReleatedSeries(catid: Number) {
    return this._http.get('http://localhost:4200/api/'+catid+'/releated/get').map(res => res.json());
  }

}
