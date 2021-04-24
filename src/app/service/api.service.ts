import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getTotalWorldCases(): Observable<any> {
    return this._http.get('https://corona.lmao.ninja/v2/all?yesterday');
  }

  getIndiaData(): Observable<any> {
    return this._http.get('https://corona.lmao.ninja/v2/countries/Italy?yesterday&strict&query%20')
  }

  getStates(): Observable<any> {
    return this._http.get('../assets/statesNDcities.json')
  }

}
