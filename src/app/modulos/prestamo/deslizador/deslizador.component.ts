import { Component, OnInit } from '@angular/core';
import { ConsolidadoService } from '../../../servicios/prestamo/consolidado.service';
import { map } from 'rxjs/operators';
import { Globales } from '../../globales';

@Component({
  selector: 'app-deslizador',
  templateUrl: './deslizador.component.html',
  styleUrls: ['./deslizador.component.css'],
})
export class DeslizadorComponent implements OnInit {
  valorMinimo: any;
  valorMaximo: number;
  mesesDesplazamiento: number;
  valor: number;
  globales: any;

  constructor(
    private consolidadoService: ConsolidadoService,
    global: Globales
  ) {
    this.globales = global;
  }

  ngOnInit(): void {
    this.valorMinimo = this.globales.valorMinimo;
    this.valorMaximo = this.globales.valorMaximo;
    this.valor = this.valorMinimo;
  }

  tomarValorSlider($event) {
    this.consolidadoService.guardarValorPrestamo($event.value);
    return $event.value;
  }
}
