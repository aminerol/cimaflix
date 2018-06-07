import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import "rxjs/add/operator/map";
import { environment } from '../../environments/environment';

@Injectable()
export class SeriesService {

  constructor(private _http: Http) {
  }

  getSeries(catid: Number) {
    return this._http.get(environment.apiEndpoint+'categories/get/'+catid).map(res => res.json());
  }

}
