import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  data: any

  constructor( private http: HttpClient ) {
    console.log('Hello UserProvider Provider');
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

}
