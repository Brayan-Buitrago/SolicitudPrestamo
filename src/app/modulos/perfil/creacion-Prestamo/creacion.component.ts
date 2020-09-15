import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsolidadoService } from '../../../servicios/perfil/consolidado.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Globales } from '../../globales';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JsonService } from 'src/app/servicios/Json/json.service';
import { kMaxLength } from 'buffer';


@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css'],
})
export class CreacionComponent implements OnInit {
  datos: FormGroup;
  @ViewChild('modalDetalle') modal: ElementRef;

  valorSolicitado: number;
  solicitudes = [];
  nuevaSolicitud = {};

  globales: any;
  constructor(
    private consolidadoService: ConsolidadoService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public json: JsonService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.consolidadoService.obtenerNuevaSolicitud().subscribe((data) => {
      this.nuevaSolicitud = data;
    });

    this.json.obternerSolicitudes().subscribe((data) => {
      this.solicitudes = data;
    });

    this.consolidadoService.obtenerValorPrestamo().subscribe((data) => {
      this.valorSolicitado = data;
    });

    this.validacionFormulario();
  }

  validacionFormulario() {
    this.datos = this.formBuilder.group({
      inputNombre: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      inputCorreo: [
        null,
        [
          Validators.email,
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      inputCedula: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(12),
        ],
      ],
      inputDate: [''],
    });
  }

  enviarCreacion(datos) {
    this.calcularMontoBase();
    const objSatos = {
      nombre: datos.value.inputNombre,
      correo: datos.value.inputCorreo,
      cedula: datos.value.inputCedula,
      valorSolicitado: this.valorSolicitado,
      fechaPagar: datos.value.inputDate,
      estadoCredito: this.evaluarEstadoCredito(),
      pagoCredito: false,
    };

    const permitirSolicitud = this.evaluarSolicitud(datos.value.inputCedula);
    if (permitirSolicitud) {
      this.json.agragrPrestamo(objSatos);
    } else {
      alert('no pueden volver a solicitar créditos.');
    }
  }

  calcularMontoBase() {
    let montoBase = 0;
    this.consolidadoService.obtenerBase().subscribe((data) => {
      montoBase = data;
    });
    this.consolidadoService.guardarBase(montoBase - this.valorSolicitado);
  }

  evaluarEstadoCredito() {
    return Math.random() >= 0.9;
  }

  evaluarSolicitud(cc) {
    let objEncontrado = true;
    this.solicitudes.map((obj) => {
      if (obj.prestamo.cedula === cc && !obj.prestamo.estadoCredito) {
        objEncontrado = false;
      }
    });

    return objEncontrado;
  }
}
