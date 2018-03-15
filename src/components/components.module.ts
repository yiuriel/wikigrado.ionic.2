import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { ImageSwitchIframeComponent } from './image-switch-iframe/image-switch-iframe';

@NgModule({
	declarations: [CustomHeaderComponent, ImageSwitchIframeComponent],
	imports: [IonicModule],
	exports: [CustomHeaderComponent, ImageSwitchIframeComponent]
})
export class ComponentsModule {}
