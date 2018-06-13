import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvProvider } from '../env/env';
import { AnalyticsProvider } from '../analytics/analytics';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

  data: any;
  BASEURL: string;
  CHECKEMAILURL: string;
  LOGINURL: string;
  UPDATELATLONG: string;
  UPDATEORIENTATIONS: string;
  UPDATEAVATAR: string;
  DELETEUSER: string;
  PASSWORD_RECOVERY: string;

  constructor( private http: HttpClient, private env: EnvProvider, private storage: Storage, private tracker: AnalyticsProvider ) {
    this.BASEURL = this.env.getEnvironmentUrl('production') + "/users";
    this.CHECKEMAILURL = this.BASEURL + "/check_email";
    this.LOGINURL = this.BASEURL + "/login";
    this.UPDATELATLONG = this.BASEURL + "/update_lat_long";
    this.UPDATEORIENTATIONS = this.BASEURL + "/set_orientations";
    this.UPDATEAVATAR = this.BASEURL + "/image";
    this.DELETEUSER = this.BASEURL + "/delete";
    this.PASSWORD_RECOVERY = this.BASEURL + "/start/password_recovery";
  }

  verifySession(callback) {
    this.storage.get('user_data').then((data) => {
      if (data && data.verified) {
        this.setUserData(data, () => {
          this.updateSession().subscribe(response => {
            if (response[0]) {
              const user = response[0];
              this.setUserData(user, () => {
                callback(user, null);
              });
            } else {
              this.clearStorage();
              callback(null, {error: 1});
            }
          }, error => {
            callback(null, error);
          });
        });
      } else {
        this.clearStorage();
        callback(null, {error: 1});
      }
    });
  }

  clearStorage() {
    this.storage.remove('user_data');
  }

  setUserData(data, callback) {
    this.data = data;
    this.storage.set('user_data', data).then(success => {
      this.tracker.setUserId(data.id);
      callback(success, null);
    }, error => {
      callback(null, error);
    })
  }

  getUserData(callback) {
    if (this.data) {
      return callback(this.data, null);
    } else {
      this.storage.get('user_data').then(data => {
        callback(data, null);
      }, error => {
        callback(null, error);
      });
    }
  }

  isSessionExpired() {
    const actual_date = new Date();
    const session_expires_date = new Date(this.data.session_expires);
    return actual_date.getTime() > session_expires_date.getTime();
  }

  updateSession() {
    let UPDATE_SESSION_URL = this.BASEURL + "/update_session";
    const httpOptions = this.getCommonHeaders();
    const data = {app_enabled_param: true, email: this.data.email, id: this.data.id};
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
        callback(null, {error: 1});
      } else {
        if (response.email && response.session_expires) {
          this.setUserData(response, (data, error) => {});
        } else {
          if (response.hasOwnProperty("available") && !data.available) {
            callback(null, {error: 'emailTakenToast'});
          } else {
            callback(null, {error: 'retryToast'});
          }
        }
        callback(data, null);
      }
    }, error => {
      if (error && error.hasOwnProperty("error") && error.error.hasOwnProperty("available")) {
        callback(null, {error: 'emailTakenToast'});
      } else {
        callback(null, {error: 1});
      }
    })
  }

  login(user, callback) {
    const httpOptions = this.getCommonHeaders();
    const data = {...user, app_enabled_param: true};
    this.http.post<{[key: string]: any}>(this.LOGINURL, data, httpOptions).subscribe(data => {
      if (data) {
        this.setUserData(data, () => {
          this.verifySession(() => {});
          callback(data, null);
        });
      }
    }, errorData => {
      if (errorData.error && errorData.error.hasOwnProperty("user_not_found") && errorData.error.user_not_found) {
        callback(null, {error: 'wrongLoginToast'});
      } else {
        callback(null, {error: 'error'});
      }
    })
  }

  updateUser(user, callback) {
    this.getUserData((data, error) => {
      if (!error) {
        const httpOptions = this.getCommonHeaders();
        const newData = {...data, ...user, app_enabled_param: true};
        this.http.put<{[key: string]: any}>(this.BASEURL, newData, httpOptions).subscribe(data => {
          if (data && data[0]) {
            callback(data[0]);
          }
        }, error => {
          callback(null, error);
        })
      }
    });
  }

  updateUserOrientations(orientations, callback) {
    this.getUserData((data, error) => {
      if (!error) {
        const httpOptions = this.getCommonHeaders();
        const newData = {id: data.id, orientations: orientations, app_enabled_param: true};
        this.http.put<{[key: string]: any}>(this.UPDATEORIENTATIONS, newData, httpOptions).subscribe(data => {
          if (data && data[0]) {
            callback(data[0]);
          }
        }, error => {
          callback(null, error);
        })
      }
    });
  }

  updateLatLong(coords, callback) {
    const httpOptions = this.getCommonHeaders();
    this.getUserData((data, error) => {
      if (!error) {
        const user = {id: data.id, app_enabled_param: true, latitude: coords.latitude, longitude: coords.longitude};
        this.http.put<{[key: string]: any}>(this.UPDATELATLONG, user, httpOptions).subscribe(update => {
          if (update) {
            this.setUserData({...data, ...user}, () => {
              callback(user, null);
            });
          } else {
            callback(null, {error: 1});
          }
        }, error => {
          callback(null, error);
        })
      }
    })
  }

  updateAvatar(avatar, callback) {
    const httpOptions = this.getCommonHeaders();
    this.getUserData((data, error) => {
      if (!error) {
        const user = {avatar: avatar, app_enabled_param: true, id: data.id};
        this.http.put<{[key: string]: any}>(this.UPDATEAVATAR, user, httpOptions).subscribe(updateAvatar => {
          if (updateAvatar) {
            const newUserData = {...data, avatar: avatar};
            this.setUserData(newUserData, (data, error) => {
              if (!error) {
                callback(newUserData, null);
              } else {
                callback(null, error);
              }
            });
          } else {
            callback(null, {error: 1});
          }
        }, error => {
          callback(null, error);
        });
      }
    });
  }

  getCommonHeaders() {
    const authStr = 'Qzmea0rxbgO7ts3deYeUME wikigrado SSY0UFT2q9LInWF3lW44AfXYz7dIXN';
    const authStrKey = authStr.substr(Math.round(Math.random() * authStr.length / 2), Math.round(Math.random() * authStr.length / 2) + 10);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authStr,
        'Authorization-Key': authStrKey
      })
    };
  }

  deleteAccount(user, callback) {
    this.http.post(this.DELETEUSER, {id: user.id, app_enabled_param: true}, this.getCommonHeaders()).subscribe(success => {
      this.storage.clear();
      callback(success, null);
    }, error => {
      callback(null, error);
    })
  }

  startPasswordRecovery(email, callback) {
    this.http.post(this.PASSWORD_RECOVERY, {email: email, app_enabled_param: true}, this.getCommonHeaders()).subscribe(success => {
      callback(success, null);
    }, error => {
      callback(null, error);
    })
  }

}
