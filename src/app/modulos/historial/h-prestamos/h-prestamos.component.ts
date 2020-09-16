import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonService } from 'src/app/servicios/Json/json.service';
import { ConsolidadoService } from 'src/app/servicios/prestamo/consolidado.service';

@Component({
  selector: 'app-h-prestamos',
  templateUrl: './h-prestamos.component.html',
  styleUrls: ['./h-prestamos.component.css']
})
export class HPrestamosComponent implements OnInit {
  @ViewChild('modalPago') modal: ElementRef;
  @ViewChild('modalHistorial') modalHistorial: ElementRef;
  solicitudes = [];
  modaResul: any;
  modaResulHistorial: any;
  detalleSolicitud: any;
  histotalPrestamo = [];
  fechaActual: number = Date.now();
  constructor( public json: JsonService,
               public modalService: NgbModal,
               private consolidadoService: ConsolidadoService) { }

  ngOnInit(): void {
    this.json.obternerSolicitudes().subscribe( data => {
      this.solicitudes  = data;
    });
  }

  eventoDetalle(solicitud){
    this.detalleSolicitud = solicitud;
    this.modaResul = this.modalService.open(this.modal);
    this.modaResul.result.then((result) => {
      if (result === 'Cerrar') {
        this.modaResul.close();
      }
    }, (reason) => {
      this.modaResul.close();
    });
  }

  eventoPagar(detalleSolicitud){

    const prestamo = {
        ...detalleSolicitud.prestamo,
        valorSolicitado: 0,
        pagoCredito : true
    };

    this.json.actualizarPrestamo(prestamo, detalleSolicitud.id );
    this.modaResul.close();
  }

  eventoNuevaSolicitud(solicitud){
    this.consolidadoService.guardarNuevaSolicitud(solicitud, true);
  }

  eventoDetalleHistorial(cc){
    this.histotalPrestamo = [];
    this.solicitudes.map((obj) => {
      if (obj.prestamo.cedula === cc) {
        this.histotalPrestamo.push(obj);
      }
    });

    this.modaResulHistorial = this.modalService.open(this.modalHistorial);
    this.modaResulHistorial.result.then((result) => {
      if (result === 'Cerrar') {
        this.modaResulHistorial.close();
      }
    }, (reason) => {
      this.modaResulHistorial.close();
    });
  }
}
