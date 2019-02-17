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

  // postHTTP(url, info: any) {
  //   var some: any;
  //   this.http.post(url, info, httpOptions).subscribe(
  //       data  => {
  //         some = data;
  //         console.log("POST Request is successful ", some);
  //       },
  //       error  => {
  //         console.log("Error", error);
  //       }
  //     );
  //     return some;
  // }
  postHTTP(url, info) {
    return new Promise((resolve, reject) => {
      this.http.post(url, info, httpOptions).subscribe((data) => {
        //if (data) alert('Успешно!');
        //console.log(data);
        resolve(data);
      }, (error) => {
        reject(error);
        console.log("Error", error);
      });
    });
  }
  getHTTP(url) {
    return new Promise((resolve, reject) => {
      this.http.get(url)
      .subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
        console.log("Error", error);
      });
    });
  }
  putHTTP(url, info: any) {
    return new Promise((resolve, reject) => {
      this.http.put(url, info, httpOptions)
      .subscribe((data) => {
        if (data) alert('Успешно обновил');// Криво отображаются запросы сервера
        resolve(data);
      }, (error) => {
        reject(error);
        console.log("Error", error);
      });
    });
  }
}
