import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import "rxjs/add/operator/map";

@Injectable()
export class SeriesService {

  constructor(private _http: Http) {
  }

  getSeries(page: number) {
    return this._http.get('http://localhost:4200/api/series/get/'+page).map(res => res.json());
  }

}
