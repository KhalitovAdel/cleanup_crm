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

  postHTTP(url, info: any) {
    return this.http.post(url, info, httpOptions).subscribe(
        data  => {
        console.log("POST Request is successful ", data);
        },
        error  => {
          console.log("Error", error);
        }
      );
  }
}
