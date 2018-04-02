import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { EnvProvider } from '../env/env';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

  data: any
  BASEURL: string;
  CHECKEMAILURL: string;
  LOGINURL: string;

  constructor( private http: HttpClient, private env: EnvProvider, private storage: Storage ) {
    console.log('Hello UserProvider Provider');
    this.BASEURL = this.env.getEnvironmentUrl(null) + "/users";
    this.CHECKEMAILURL = this.BASEURL + "/check_email";
    this.LOGINURL = this.BASEURL + "/login";

  }

  verifySession() {
    this.storage.get('user_data').then((data) => {
      if (data) {
        this.data = data;
        this.updateSession().subscribe(update_session_data => {
          if (update_session_data.hasOwnProperty("affectedRows") && update_session_data.hasOwnProperty("session_expires")) {
            const newData = {...this.data, session_expires: update_session_data.session_expires};
            this.setUserData(newData);
          }
        });
      }
    });
  }

  getData() {
    return this.data;
  }

  setUserData(data) {
    this.storage.set('user_data', data);
  }

  setUserDataAsync(data) {
    return this.storage.set('user_data', data);
  }

  updateSession() {
    let UPDATE_SESSION_URL = this.BASEURL + "/" + this.data.id + "/update_session";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const data = {app_enabled_param: true};
    return this.http.put<{[key: string]: any}>(UPDATE_SESSION_URL, data, httpOptions)
  }

  checkEmail(email) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const data = {email: email, app_enabled_param: true};
    return this.http.post<{[key: string]: any}>(this.CHECKEMAILURL, data, httpOptions)
  }

  register(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const data = {...user, app_enabled_param: true};
    return this.http.post<{[key: string]: any}>(this.BASEURL, data, httpOptions)
  }

  login(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const data = {...user, app_enabled_param: true};
    return this.http.post<{[key: string]: any}>(this.LOGINURL, data, httpOptions)
  }

}
