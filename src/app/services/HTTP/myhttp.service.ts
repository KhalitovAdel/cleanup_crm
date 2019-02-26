import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',
})

export class myHTTPService {

  constructor(private http: HttpClient) { }

  postHTTP(url, info) {
    return this.http.post(url, info, httpOptions);
  }
  getHTTP(url) {
    return this.http.get(url, httpOptions);
  }
  putHTTP(url, info: any) {
    return this.http.put(url, info, httpOptions);
  }
}
