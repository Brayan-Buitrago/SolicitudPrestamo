import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreacionComponent } from './creacion-Prestamo/creacion.component';

const routes: Routes = [
  { path: '', component: CreacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
