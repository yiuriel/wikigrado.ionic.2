import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { ImageSwitchIframeComponent } from './image-switch-iframe/image-switch-iframe';
import { TestProgressBarComponent } from './test-progress-bar/test-progress-bar';
import { AddToFavoriteHeaderComponent } from './add-to-favorite-header/add-to-favorite-header';

@NgModule({
	declarations: [CustomHeaderComponent, ImageSwitchIframeComponent,
    TestProgressBarComponent,
    AddToFavoriteHeaderComponent],
	imports: [IonicModule],
	exports: [CustomHeaderComponent, ImageSwitchIframeComponent,
    TestProgressBarComponent,
    AddToFavoriteHeaderComponent]
})
export class ComponentsModule {}
