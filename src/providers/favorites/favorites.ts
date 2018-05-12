import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvProvider } from '../env/env';
import { AllAppDataProvider } from '../all-app-data/all-app-data';

@Injectable()
export class FavoritesProvider {

  favorites: Array<{[key: string]: any}>
  BASEURL: string;
  ADDFAVORITEURL: string;
  REMOVEFAVORITEURL: string;
  CHECKFAVORITEURL: string;

  constructor(public http: HttpClient, private env: EnvProvider, public allAppDataService: AllAppDataProvider) {
    console.log('Hello FavoritesProvider Provider');
    this.favorites = [];

    this.BASEURL = this.env.getEnvironmentUrl('local') + "/favorites";
    this.ADDFAVORITEURL = this.BASEURL + "/add/";
    this.REMOVEFAVORITEURL = this.BASEURL + "/remove/";
    this.CHECKFAVORITEURL = this.BASEURL + "/check/";
  }

  getFavorites(user_id, callback) {
    this.http.get(this.BASEURL + "/" + user_id).subscribe(favorites => {
      callback(favorites, null);
    }, error => {
      callback(null, error);
    });
  }

  checkFavorite(item, user_id, callback) {
    this.http.get(this.CHECKFAVORITEURL + user_id + "/" + item.type + "/" + item.index).subscribe(response => {
      callback(response, null);
    }, error => {
      callback(null, error);
    });
  }

  addFavorite(item, user_id, callback) {
    const data = {favorite_id: item.index, type: item.type, app_enabled_param: true};
    this.http.post(this.ADDFAVORITEURL + user_id, data, this.getCommonHeaders()).subscribe(response => {
      callback(response, null);
    }, error => {
      callback(null, error);
    });
  }

  removeFavorite(item, user_id, callback) {
    this.http.delete(this.REMOVEFAVORITEURL + user_id + "/" + item.type + "/" + item.index, this.getCommonHeaders()).subscribe(response => {
      callback(response, null);
    }, error => {
      callback(null, error);
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
