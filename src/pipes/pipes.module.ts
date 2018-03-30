import { NgModule } from '@angular/core';
import { NoSnakeCasePipe } from './no-snake-case/no-snake-case';
@NgModule({
	declarations: [NoSnakeCasePipe],
	imports: [],
	exports: [NoSnakeCasePipe]
})
export class PipesModule {}
