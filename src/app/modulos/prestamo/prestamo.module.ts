import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoRoutingModule } from './prestamo-routing.module';
import { CreacionComponent } from './creacion-Prestamo/creacion.component';
import { DeslizadorComponent } from './deslizador/deslizador.component';
import { HttpClient } from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    CreacionComponent,
    DeslizadorComponent,
  ],
  imports: [
    CommonModule,
    PrestamoRoutingModule,
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
export class PrestamoModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
