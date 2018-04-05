import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvProvider } from '../env/env';
import { AllAppDataProvider } from '../all-app-data/all-app-data';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoritesProvider {

  favorites: Array<{[key: string]: any}>
  BASEURL: string;
  ADDFAVORITEURL: string;

  constructor(public http: HttpClient, private env: EnvProvider, private storage: Storage, public allAppDataService: AllAppDataProvider) {
    console.log('Hello FavoritesProvider Provider');
    this.favorites = [];

    this.BASEURL = this.env.getEnvironmentUrl('production') + "/favorites";
    this.ADDFAVORITEURL = this.BASEURL + "/add/";
  }

  getFavorites(user_id, callback) {
    this.http.get(this.BASEURL + "/" + user_id).subscribe(favorites => {
      callback('success', favorites);
    }, error => {
      console.log(error);
      callback('error');
    });
  }

  addFavorite(item, user_id, callback) {
    const data = {item_id_in_app: item.index, item_type_in_app: item.type, app_enabled_param: true};
    this.http.post(this.ADDFAVORITEURL + user_id, data, this.getCommonHeaders()).subscribe(response => {
      console.log(response);
      callback('success', response);
    }, error => {
      console.log(error);
      callback('error');
    });
    console.warn(item, " --> add");
  }

  removeFavorite(item) {
    this.removeFromFavorites(item);
    console.warn(this.favorites, " --> remove");
  }

  exists(item) {
    return this.favorites.filter(favorite => favorite.index === item.index && favorite.type === item.type).length > 0
  }

  removeFromFavorites(item) {
    const index = this.favorites.findIndex(favorite => favorite.index === item.index && favorite.type === item.type)
    // console.warn(index, this.favorites[index], item);
    this.favorites.splice(index, 1);
  }

  getCommonHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

}
