import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
  ]
})
export class MenuModule { }



