import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { CreacionComponent } from './creacion-Prestamo/creacion.component';
import { DeslizadorComponent } from './deslizador/deslizador.component';
import { TarjetaCreditoComponent } from './tarjeta-credito/tarjeta-credito.component';
import { CuentaAhorroComponent } from './cuenta-ahorro/cuenta-ahorro.component';


import { HttpClient } from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    ProductosComponent,
    CreacionComponent,
    DeslizadorComponent,
    TarjetaCreditoComponent,
    CuentaAhorroComponent,
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ]
})
export class PerfilModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
