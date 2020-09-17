import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/servicios/Json/json.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-base-encabezado',
  templateUrl: './base-encabezado.component.html',
  styleUrls: ['./base-encabezado.component.css'],
})
export class BaseEncabezadoComponent implements OnInit {
  fechaActual: number = Date.now();
  base: number;
  solicitudes = [];
  constructor(public json: JsonService) {}

  ngOnInit(): void {
    this.base = environment.capitalBase;
    this.json.obternerSolicitudes().subscribe((data) => {
      this.solicitudes = data;
      this.calcularBase();
    });
  }

  calcularBase() {
    let sumaPrestamos = 0;
    this.solicitudes.map((obj) => {
      if (obj.prestamo.estadoCredito) {
        sumaPrestamos += obj.prestamo.valorSolicitado;
      }
    });

    this.base = this.base - sumaPrestamos;
  }
}
