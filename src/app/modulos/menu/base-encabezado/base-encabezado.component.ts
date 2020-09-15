import { Component, OnInit } from '@angular/core';
import { ConsolidadoService } from 'src/app/servicios/perfil/consolidado.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-base-encabezado',
  templateUrl: './base-encabezado.component.html',
  styleUrls: ['./base-encabezado.component.css']
})
export class BaseEncabezadoComponent implements OnInit {

  fechaActual: number = Date.now();
  base: number;
  constructor(private consolidadoService: ConsolidadoService) {
  }

  ngOnInit(): void {
    this.consolidadoService.guardarBase(environment.capitalBase);
    this.consolidadoService.obtenerBase().subscribe( data => {
      this.base = data;
    });
  }

}
