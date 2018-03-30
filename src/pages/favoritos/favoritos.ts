import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites'

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {

  favorites: Array<{[key: string]: any}>

  constructor(public navCtrl: NavController, public navParams: NavParams, public favoritesService: FavoritesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritosPage');
    this.favorites = this.favoritesService.getFavorites();
  }

}
