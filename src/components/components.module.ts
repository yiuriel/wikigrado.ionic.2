import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { ImageSwitchIframeComponent } from './image-switch-iframe/image-switch-iframe';
import { TestProgressBarComponent } from './test-progress-bar/test-progress-bar';

@NgModule({
	declarations: [CustomHeaderComponent, ImageSwitchIframeComponent,
    TestProgressBarComponent],
	imports: [IonicModule],
	exports: [CustomHeaderComponent, ImageSwitchIframeComponent,
    TestProgressBarComponent]
})
export class ComponentsModule {}
