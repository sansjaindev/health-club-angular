import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { Contact } from '../contact-us/contact-us.component';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: Http) { }
    postfitnessdata(data){
      return this.http.post(UserService.BaseUrl+'appointment',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    postquerydata(data){
      return this.http.post(UserService.BaseUrl+'query',data, httpOptions).pipe(map((response: Response) => response.json()));
    }
    
    
    getfitnessdata() {
      return this.http.get(UserService.BaseUrl+'appointment',httpOptions).pipe(map((response: Response) => response.json()));
    }

    // add more methods as per requirements
}