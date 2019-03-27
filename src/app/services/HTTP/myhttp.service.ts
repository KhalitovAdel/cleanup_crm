import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root',
})

export class myHTTPService {
  base_href: 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  postHTTP(url, info) {
    return this.http.post(this.base_href.concat(url), info, {withCredentials: true});
  }
  getHTTP(url) {
    return this.http.get(this.base_href.concat(url), {withCredentials: true});
  }
  putHTTP(url, info: any) {
    return this.http.put(this.base_href.concat(url), info, {withCredentials: true});
  }
}
