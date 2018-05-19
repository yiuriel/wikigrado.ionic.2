import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Slides } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites'
import { UserProvider } from '../../providers/user/user';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { GradoPage } from '../grado/grado';
import { LoaderProvider } from '../../providers/loader/loader';
import { ToasterProvider } from '../../providers/toaster/toaster';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {

  @ViewChild(Slides) slides: Slides;
  avatars: Array<string>
  avatar: number;
  favorites: Array<{[key: string]: any}> = [];
  userData: {[key: string]: any}
  dimensions: {width: number, height: number}
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, public favoritesService: FavoritesProvider, public allAppDataService: AllAppDataProvider, public modalCtrl: ModalController, private domElem: ElementRef, public loaderService: LoaderProvider, public toasterService: ToasterProvider) {
    this.loaderService.showLoader({content:'Cargando...'});
    this.userService.getUserData((data, error) => {
      if (!error) {
        this.userData = data;
        this.avatar = data.avatar;
        this.getFavorites((done, error) => {
          this.loaderService.hideLoader();
        });
      }
    })

    this.avatars = ['assets/imgs/avatar/1.png','assets/imgs/avatar/2.png','assets/imgs/avatar/3.png','assets/imgs/avatar/4.png','assets/imgs/avatar/5.png','assets/imgs/avatar/6.png','assets/imgs/avatar/7.png','assets/imgs/avatar/8.png','assets/imgs/avatar/9.png','assets/imgs/avatar/10.png','assets/imgs/avatar/11.png']
  }

  slideChanged() {
    this.avatar = this.slides.getActiveIndex();
  }

  getFavorites(callback) {
    this.favoritesService.getFavorites(this.userData.id, (favorites, favoritesError) => {
      if (!favoritesError) {
        let res = [];
        favorites.forEach(item => {
          let founditem = this.allAppDataService.getDataBasedOnTypeAndIndex(item.type, item.favorite_id);
          if (founditem) {
            res = res.concat([{...founditem, type: item.type, index: item.favorite_id}]);
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
      //{data: {...gradeWithUnivs, type: 'grado', index: gradeWithUnivs.id}, dimensionData: this.dimensions}
      let modal = this.modalCtrl.create(GradoPage, {data: item, dimensionData: this.dimensions});
      modal.onDidDismiss(() => {
        this.loaderService.showLoader({content:'Cargando...'});
        this.getFavorites(() => {
          this.loaderService.hideLoader();
        });
        modal = null;
      })
      modal.present();
    }
  }

  deleteFavorite(favorite) {
    this.loaderService.showLoader({content:'removiendo favorito...'});
    this.favoritesService.removeFavorite(favorite, this.userData.id, (success, error) => {
      if (error) {
        this.loaderService.hideLoader();
        this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
      } else {
        this.getFavorites(() => {
          this.loaderService.hideLoader();
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritosPage');
  }

}
