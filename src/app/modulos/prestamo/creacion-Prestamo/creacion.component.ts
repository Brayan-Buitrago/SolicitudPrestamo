import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsolidadoService } from '../../../servicios/prestamo/consolidado.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JsonService } from 'src/app/servicios/Json/json.service';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css'],
})
export class CreacionComponent implements OnInit {
  datos: FormGroup;
  @ViewChild('modal') modal: ElementRef;

  modaResul: any;
  valorSolicitado: number;
  solicitudes = [];
  nuevaSolicitud = {};

  constructor(
    private consolidadoService: ConsolidadoService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public json: JsonService
  ) {}

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
    this.cargarDatosCreacion();
  }

  cargarDatosCreacion() {
    if (this.nuevaSolicitud['datos']) {
      this.datos.controls.inputNombre.setValue(
        this.nuevaSolicitud['datos'].prestamo.nombre
      );
      this.datos.controls.inputCorreo.setValue(
        this.nuevaSolicitud['datos'].prestamo.correo
      );
      this.datos.controls.inputCedula.setValue(
        this.nuevaSolicitud['datos'].prestamo.cedula
      );
      this.datos.controls.inputDate.setValue(
        this.nuevaSolicitud['datos'].prestamo.fechaPagar
      );
    }
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
      this.nuevaSolicitud = {};
    } else {
      this.modaResul = this.modalService.open(this.modal);
      this.modaResul.result.then(
        (result) => {
          if (result === 'Cerrar') {
            this.modaResul.close();
          }
        },
        (reason) => {
          this.modaResul.close();
        }
      );
    }
  }

  evaluarEstadoCredito() {
    if (this.nuevaSolicitud['datos']) {
      return true;
    } else {
      return Math.random() >= 0.9;
    }
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
