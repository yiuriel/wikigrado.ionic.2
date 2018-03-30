import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FavoritesProvider {

  favorites: Array<{[key: string]: any}>

  constructor(public http: HttpClient) {
    console.log('Hello FavoritesProvider Provider');
    this.favorites = [];
  }

  getFavorites() {
    return this.favorites.sort((prev, next) => next.type);
  }

  addFavorite(item) {
    if (!this.exists(item)) {
      this.favorites.push(item);
    }
    console.warn(this.favorites, " --> add");
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

}
