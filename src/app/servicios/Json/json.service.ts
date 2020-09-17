import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ConsolidadoService } from '../prestamo/consolidado.service';

const BASE_URL = environment.base;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-control': 'no-cache',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  baseUrl = `${BASE_URL}/product`;

  constructor(public http: HttpClient,
              private consolidadoService: ConsolidadoService) {}

  actualizarPrestamo(prestamo: any, id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http
      .put(
        this.baseUrl + '/' + id,
        {
          prestamo,
        },
        { headers }
      )
      .subscribe(
        (val) => {
          console.log('Llamado ok', val);
        },
        (response) => {
          console.log('Llamado error', response);
        },
        () => {
          console.log('PUT Completo');
        }
      );
  }

  agragrPrestamo(prestamo: any) {
    this.http
      .post(this.baseUrl, {
        prestamo,
      })
      .subscribe(
        (val) => {
          console.log('Llamado ok', val);
        },
        (response) => {
          console.log('Llamado error', response);
        },
        () => {
          console.log('POST Completo.');
        }
      );
  }

  obternerSolicitudes(): Observable<any> {
    const partnerUrl = `${BASE_URL}/prestamos`;
    return this.http
      .get<any>(partnerUrl, httpOptions)
      .pipe(catchError(this.catchErrorCallback()));
  }

  catchErrorCallback(): (err) => any {
    return (err) => {
      throw new Error('error en json.service: ' + err);
    };
  }
}
