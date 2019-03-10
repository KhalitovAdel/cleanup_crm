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

  constructor(private http: HttpClient) { }

  postHTTP(url, info) {
    return this.http.post(url, info, {withCredentials: true});
  }
  getHTTP(url) {
    return this.http.get(url, {withCredentials: true});
  }
  putHTTP(url, info: any) {
    return this.http.put(url, info, {withCredentials: true});
  }
}
