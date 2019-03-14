import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observer, Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const token = sessionStorage.getItem('token');
    return token ?
      headers.append('Authorization', `Bearer ${token}`)
      : headers;
  }

  get(resource: string): Promise<any>;
  get(resource: string, observer: Observer<any>): Subscription;
  get(resource: string, observer?: Observer<any>): any {
    const observable = this.http.get(`/api/${resource}`, {
      headers: this.getHeaders()
    });
    return observer ?
      observable.subscribe(observer)
      : new Promise((res, rej) => {
        observable.subscribe(res, rej);
      });
  }
  post(resource: string, body: object): Promise<any>;
  post(resource: string, body: object, observer: Observer<any>): Subscription;
  post(resource: string, body: object, observer?: Observer<any>): any {
    const observable = this.http.post(`/api/${resource}`, body, {
      headers: this.getHeaders()
    });
    return observer ?
      observable.subscribe(observer)
      : new Promise((res, rej) => {
        observable.subscribe(res, rej);
      });
  }
  put(resource: string, body: object): Promise<any>;
  put(resource: string, body: object, observer: Observer<any>): Subscription;
  put(resource: string, body: object, observer?: Observer<any>): any {
    const observable = this.http.post(`/api/${resource}`, body, {
      headers: this.getHeaders()
    });
    return observer ?
      observable.subscribe(observer)
      : new Promise((res, rej) => {
        observable.subscribe(res, rej);
      });
  }
}
