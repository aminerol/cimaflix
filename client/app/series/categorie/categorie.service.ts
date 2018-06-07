import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import "rxjs/add/operator/map";
import { environment } from '../../../environments/environment';

@Injectable()
export class CategorieService {

  constructor(private _http: Http) {
  }

  getSerieOfCategorie(page: number, catid: Number) {
    return this._http.get(environment.apiEndpoint+'series/get/'+catid+'/'+page).map(res => res.json());
  }

}
