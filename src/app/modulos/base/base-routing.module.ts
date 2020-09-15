import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilModule),
  },
  {
    path: 'historial', loadChildren: () => import('../historial/historial.module').then(m => m.HistorialModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
