import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { PrestamoRoutingModule } from '../prestamo/prestamo-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseRoutingModule,
    PrestamoRoutingModule
  ]
})
export class BaseModule { }
