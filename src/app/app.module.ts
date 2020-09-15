import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './modulos/menu/menu/menu.component';
import { BaseEncabezadoComponent } from './modulos/menu/base-encabezado/base-encabezado.component';
import { HttpClientModule } from '@angular/common/http';
import { Enmascara } from './servicios/enmascarar/Enmascarar.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Globales } from './modulos/globales';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {CurrencyPipe} from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BaseEncabezadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [
    Enmascara, Globales, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

