import { Component, Input } from '@angular/core';
import { FavoritesProvider } from '../../providers/favorites/favorites'
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: '[addtofavoriteheader]',
  templateUrl: 'add-to-favorite-header.html'
})
export class AddToFavoriteHeaderComponent {

  @Input() favoriteItem: {[key: string]: any};
  add: boolean;

  constructor(public favoritesService: FavoritesProvider, public tracker: AnalyticsProvider) {
    console.log('Hello AddToFavoriteHeaderComponent Component');
    this.add = true;
  }

  addToFavorite() {
    if (this.add) {
      this.favoritesService.addFavorite(this.favoriteItem);
      this.tracker.trackEvent('favorito', 'agregar favorito', this.getLabelForGA(), 1);
    } else {
      this.favoritesService.removeFavorite(this.favoriteItem);
      this.tracker.trackEvent('favorito', 'quitar favorito', this.getLabelForGA(), 1);
    }
    this.add = !this.add;
  }

  getLabelForGA() {
    switch(this.favoriteItem.type) {
      case "colegio_mayor":
      case "grado":
        return this.favoriteItem.type + " - " + this.favoriteItem.career;
      case "universidad":
        return this.favoriteItem.type + " - " + this.favoriteItem.universidad;
    }
  }

}
