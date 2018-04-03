import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { EnvProvider } from '../env/env';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

  data: any;
  BASEURL: string;
  CHECKEMAILURL: string;
  LOGINURL: string;

  constructor( private http: HttpClient, private env: EnvProvider, private storage: Storage ) {
    console.log('Hello UserProvider Provider');
    this.BASEURL = this.env.getEnvironmentUrl(null) + "/users";
    this.CHECKEMAILURL = this.BASEURL + "/check_email";
    this.LOGINURL = this.BASEURL + "/login";
  }

  verifySession(callback) {
    this.storage.get('user_data').then((data) => {
      if (data) {
        this.setUserData(data);
        this.updateSession().subscribe(response => {
          if (response.hasOwnProperty("affectedRows") && response.hasOwnProperty("session_expires") && response.affectedRows > 0) {
            const newData = {...this.data, session_expires: response.session_expires};
            this.setUserData(newData);
            callback('logged-in');
          } else {
            this.clearStorage();
            callback('error');
          }
        });
      } else {
        this.clearStorage();
        callback('error');
      }
    });
  }

  clearStorage() {
    this.storage.clear();
  }

  getUserDataAsync() {
    return this.storage.get('user_data');
  }

  getData() {
    return this.data;
  }

  setUserData(data) {
    this.setData(data);
    this.storage.set('user_data', data);
  }

  setUserDataAsync(data) {
    this.setData(data);
    return this.storage.set('user_data', data);
  }

  setData(data) {
    this.data = data;
  }

  isSessionExpired() {
    const actual_date = new Date();
    const session_expires_date = new Date(this.data.session_expires);
    return actual_date.getTime() > session_expires_date.getTime();
  }

  updateSession() {
    let UPDATE_SESSION_URL = this.BASEURL + "/" + this.data.id + "/update_session";
    const httpOptions = this.getCommonHeaders();
    const data = {app_enabled_param: true};
    return this.http.put<{[key: string]: any}>(UPDATE_SESSION_URL, data, httpOptions)
  }


  checkEmail(email, callback) {
    const httpOptions = this.getCommonHeaders();
    const data = {email: email, app_enabled_param: true};
    this.http.post<{[key: string]: any}>(this.CHECKEMAILURL, data, httpOptions).subscribe(response => {
      if (response.hasOwnProperty("available") && !response.available) {
        callback('not-available');
      } else if (response.error && response.status && response.name === "HttpErrorResponse") {
        callback('error');
      }
    }, error => {
      callback('error');
    });
  }

  register(user, callback) {
    const httpOptions = this.getCommonHeaders();
    const data = {...user, app_enabled_param: true};
    this.http.post<{[key: string]: any}>(this.BASEURL, data, httpOptions).subscribe(response => {
      if (response.error && response.status && response.name === "HttpErrorResponse") {
        callback('error');
      } else {
        if (response.hasOwnProperty("insertId")) {
          this.setUserData({...user, id: response.insertId});
        } else {
          if (response.hasOwnProperty("available") && !data.available) {
            callback('emailTakenToast');
          } else {
            callback('retryToast');
          }
        }
        callback('success');
      }
    }, error => {
      callback('error');
    })
  }

  login(user, callback) {
    const httpOptions = this.getCommonHeaders();
    const data = {...user, app_enabled_param: true};
    this.http.post<{[key: string]: any}>(this.LOGINURL, data, httpOptions).subscribe(data => {
      if (data.length) {
        this.setUserDataAsync(data[0]).then(success => {
          this.verifySession(() => {});
          callback('success');
        })
      }
    }, errorData => {
      if (errorData.error && errorData.error.hasOwnProperty("user_not_found") && errorData.error.user_not_found) {
        callback('wrongLoginToast');
      } else {
        callback('error');
      }
    })
  }

  updateLatLong(coords) {
    console.log("update coords", coords);
  }

  getCommonHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

}
