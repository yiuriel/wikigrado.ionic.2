import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { EnvProvider } from '../env/env';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

  data: any
  BASEURL: string;

  constructor( private http: HttpClient, private env: EnvProvider, private storage: Storage ) {
    console.log('Hello UserProvider Provider');
    this.BASEURL = this.env.getEnvironmentUrl('dev') + "/users";
  }

  saveData(user) {
    this.http.post('url', {});
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setUserData(data) {
    this.storage.set('user_data', data);
  }

  register(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const data = {...user, app_enabled_param: true};
    // console.warn(data);
    return this.http.post<{[key: string]: any}>(this.BASEURL, data, httpOptions)
  }

}
