import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvProvider } from '../env/env';
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

  constructor( private http: HttpClient, private env: EnvProvider, private storage: Storage ) {
    console.log('Hello UserProvider Provider');
    this.BASEURL = this.env.getEnvironmentUrl('production') + "/users";
    this.CHECKEMAILURL = this.BASEURL + "/check_email";
    this.LOGINURL = this.BASEURL + "/login";
    this.UPDATELATLONG = this.BASEURL + "/update_lat_long";
    this.UPDATEORIENTATIONS = this.BASEURL + "/set_orientations";
    this.UPDATEAVATAR = this.BASEURL + "/image";
  }

  verifySession(callback) {
    this.storage.get('user_data').then((data) => {
      if (data) {
        this.setUserData(data, () => {
          this.updateSession().subscribe(response => {
            if (response[0]) {
              const user = response[0];
              // console.log("update session success", user);
              this.setUserData(user, () => {
                callback(user, null);
              });
            } else {
              // console.error("update session error in update session");
              this.clearStorage();
              callback(null, {error: 1});
            }
          }, error => {
            callback(null, error);
          });
        });
      } else {
        console.error("update session error no data");
        this.clearStorage();
        callback(null, {error: 1});
      }
    });
  }

  clearStorage() {
    this.storage.clear();
  }

  setUserData(data, callback) {
    this.data = data;
    this.storage.set('user_data', data).then(success => {
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
    console.log("start register");
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
        console.log("end register");
        callback(data, null);
      }
    }, error => {
      callback(null, {error: 1});
    })
  }

  login(user, callback) {
    const httpOptions = this.getCommonHeaders();
    const data = {...user, app_enabled_param: true};
    console.log("start login");
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
        const newData = {id: data.id, ...orientations, app_enabled_param: true};
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
    // console.log("update coords", coords);
    const httpOptions = this.getCommonHeaders();
    this.getUserData((data, error) => {
      if (!error) {
        const user = {id: data.id, app_enabled_param: true, latitude: coords.latitude, longitude: coords.longitude};
        this.http.put<{[key: string]: any}>(this.UPDATELATLONG, user, httpOptions).subscribe(update => {
          console.log("success update lat long");
          if (update) {
            // console.log(user, update);
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

  updateAvatar(image, callback) {
    const httpOptions = this.getCommonHeaders();
    this.getUserData((data, error) => {
      if (!error) {
        const user = {image: image, app_enabled_param: true, id: data.id};
        this.http.put<{[key: string]: any}>(this.UPDATEAVATAR, user, httpOptions).subscribe(updateAvatar => {
          if (updateAvatar) {
            // console.log(user, updateAvatar);
            const newUserData = {...data, image: image};
            // console.warn(JSON.stringify(newUserData));
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
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

}
