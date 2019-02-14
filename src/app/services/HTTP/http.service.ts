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

export class HTTPService {

  constructor(private http: HttpClient) { }

  postMakePDF(url, price: String) {
    console.log('postMakePDF');
    return this.http.post(url, {'itog': price}, httpOptions).subscribe(
        data  => {
        console.log("POST Request is successful ", data);
        },
        error  => {
          console.log("Error", error);
        }
      );
  }
}
