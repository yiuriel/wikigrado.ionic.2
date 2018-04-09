import { Component, Input } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites'
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: '[addtofavoriteheader]',
  templateUrl: 'add-to-favorite-header.html'
})
export class AddToFavoriteHeaderComponent {

  @Input() favoriteItem: {[key: string]: any};
  add: boolean;
  userData: {[key: string]: any}
  loader: any;
  toast: any;

  constructor(public favoritesService: FavoritesProvider, public tracker: AnalyticsProvider, public userService: UserProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    console.log('Hello AddToFavoriteHeaderComponent Component');
    this.add = true;

    this.userData = null;
    this.showLoader('cargando...');
    this.userService.getUserData((data, error) => {
      if (!error) {
        this.userData = data;
        this.favoritesService.checkFavorite(this.favoriteItem, data.id, (found, error) => {
          this.hideLoader();
          if (found && found[0]) {
            this.add = false;
          }
        });
      } else {
        this.hideLoader();
      }
    });
  }

  addToFavorite() {
    if (this.add) {
      this.showLoader('guardando favorito...');
      this.favoritesService.addFavorite(this.favoriteItem, this.userData.id, (success, error) => {
        this.hideLoader();
        if (error) {
          this.retryToast();
        } else {
          this.add = !this.add;
        }
      });
    } else {
      this.showLoader('removiendo favorito...');
      this.favoritesService.removeFavorite(this.favoriteItem, this.userData.id, (success, error) => {
        this.hideLoader();
        if (!error) {
          this.add = !this.add;
        } else {
          this.retryToast();
        }
      });
    }
  }

  showLoader(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
      spinner: 'crescent',
    });

    this.loader.present();
  }

  hideLoader() {
    this.loader.dismiss();
  }

  retryToast() {
    this.toast = this.toastCtrl.create({
      message: 'Hubo un error, vuelve a intentarlo más tarde.',
      duration: 5000,
      position: 'bottom',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

}
