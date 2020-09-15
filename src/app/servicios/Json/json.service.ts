import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const BASE_URL = environment.base;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Cache-control': 'no-cache'
  })
};

@Injectable({
  providedIn: 'root'
})


export class JsonService {
baseUrl = `${BASE_URL}/product`;

  constructor(public http: HttpClient) { }



  actualizarPrestamo(prestamo: any, id: number) {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    this.http.put(this.baseUrl + '/' + id,
    {
      prestamo
    }, {headers})
    .subscribe(
        val => {
            console.log("PUT call successful value returned in body", 
                        val);
        },
        response => {
            console.log("PUT call in error", response);
        },
        () => {
            console.log("The PUT observable is now completed.");
        }
    );
    }
  
  agragrPrestamo(prestamo: any) {

    this.http.post(this.baseUrl,
    {
      prestamo
    })
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });


    /*return this.http.post<any>(this.baseUrl, prestamo, httpOptions).pipe(
      tap((newprestamo: any) => console.log(`added hero w/ id=${newprestamo.id}`)),
      catchError(this.catchErrorCallback())
    );*/
  }


  obternerSolicitudes(): Observable<any> {
    const partnerUrl = `${BASE_URL}/product`;
    return this.http.get<any>(partnerUrl, httpOptions).pipe(
      catchError( this.catchErrorCallback()));
  }

  catchErrorCallback(): (err) => any {
    return err => {
      throw new Error('error en json.service: ' + err);
    };
  }
}
