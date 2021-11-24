import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  private base_url = 'http://localhost:8082/smoke/api/v1/data';

  constructor(
    private http: HttpClient
  ) { }

  public getLastTen(): Observable<any> {
    return this.http.get(this.base_url + "/get/last/ten");
  }
}
