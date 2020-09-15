import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing.module';
import { HPrestamosComponent } from './h-prestamos/h-prestamos.component';


@NgModule({
  declarations: [HPrestamosComponent],
  imports: [
    CommonModule,
    HistorialRoutingModule
  ]
})
export class HistorialModule { }
