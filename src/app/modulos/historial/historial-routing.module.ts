import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HPrestamosComponent } from './h-prestamos/h-prestamos.component';


const routes: Routes = [
  { path: '', component: HPrestamosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRoutingModule { }
