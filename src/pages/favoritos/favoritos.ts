import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites'
import { UserProvider } from '../../providers/user/user';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { GradoPage } from '../grado/grado';
import { LoaderProvider } from '../../providers/loader/loader';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {

  favorites: Array<{[key: string]: any}>
  userData: {[key: string]: any}
  dimensions: {width: number, height: number}
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, public favoritesService: FavoritesProvider, public allAppDataService: AllAppDataProvider, public modalCtrl: ModalController, private domElem: ElementRef, public loaderService: LoaderProvider) {
    this.loaderService.showLoader({content:'cargando...'});
    this.userService.getUserData((data, error) => {
      if (!error) {
        this.userData = data;
        this.getFavorites((done, error) => {
          this.loaderService.hideLoader();
        });
      }
    })
  }

  getFavorites(callback) {
    this.favoritesService.getFavorites(this.userData.id, (favorites, favoritesError) => {
      if (!favoritesError) {
        let res = [];
        favorites.forEach(item => {
          let founditem = this.allAppDataService.getDataBasedOnTypeAndIndex(item.item_type_in_app, item.item_id_in_app);
          if (founditem) {
            res = res.concat(founditem);
          }
        });
        this.favorites = res;
      }
      callback();
    });
  }

  ionViewDidEnter() {
    let width = this.domElem.nativeElement.offsetWidth - 32;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }
  }

  viewFavorite(item) {
    if (item) {
      let modal = this.modalCtrl.create(GradoPage, {videoData: item, dimensionData: this.dimensions});
      modal.onDidDismiss(() => {
        this.loaderService.showLoader({content:'cargando...'});
        this.getFavorites(() => {
          this.loaderService.hideLoader();
        });
        modal = null;
      })
      modal.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritosPage');
  }

}
