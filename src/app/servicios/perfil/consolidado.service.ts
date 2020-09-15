import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsolidadoService {

  
  private contentEmitter = new ReplaySubject<any>();
  private valorPrestamo = new ReplaySubject<any>();
  private base = new ReplaySubject<any>();
  private nuevaSolicitud = new BehaviorSubject<any>({});

  constructor() { }

  
guardarBase(base: number){
  this.base.next(base);
}

obtenerBase()  {
  return this.base.asObservable();
}

  guardarValorPrestamo(valor: number){
    this.valorPrestamo.next(valor);
  }

  obtenerValorPrestamo()  {
    return this.valorPrestamo.asObservable();
  }
  
   
  guardarNuevaSolicitud(datos: number, nueva: boolean){
  this.nuevaSolicitud.next({datos, nueva} );
}

obtenerNuevaSolicitud()  {
  return this.nuevaSolicitud.asObservable();
} 
  
  
  
  
  
  
  cargarContenido(json: any){
    this.contentEmitter.next(json);
  }

  obtenerJson()  {
    return this.contentEmitter.asObservable();
  }


}
