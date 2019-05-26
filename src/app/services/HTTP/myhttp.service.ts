import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
  URL: String;
  base_href:String = 'http://localhost:3001';

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  postHTTP(url:string, info) {
    return this.http.post(this.base_href.concat(url), info, {withCredentials: true});
  }
  getHTTP(url:string) {
    return this.http.get(this.base_href.concat(url), {withCredentials: true});
  }
  putHTTP(url:string, info: any) {
    return this.http.put(this.base_href.concat(url), info, {withCredentials: true});
  }

  order(text: String) {
    this.URL = this.router.url;
    text = text.concat(`<br><p><span style="font-weight: 700">Ссылка: </span>${this.URL}</p>`)
    return this.http.post(this.base_href.concat('/public/order'), {email: undefined, text: text, subject: 'Заявка с сайта'}, {withCredentials: true});
  }
}
