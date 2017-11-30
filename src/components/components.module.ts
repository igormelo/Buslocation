import { NgModule } from '@angular/core';
import { MylocationComponent } from './mylocation/mylocation';
import { MapComponent } from './map/map';
import { BuslocationComponent } from './buslocation/buslocation';
@NgModule({
	declarations: [MylocationComponent,
    BuslocationComponent],
	imports: [],
	exports: [MylocationComponent,
    BuslocationComponent]
})
export class ComponentsModule { }
