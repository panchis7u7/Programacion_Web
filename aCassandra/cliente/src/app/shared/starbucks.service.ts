import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { IStarbucks } from '../Models/Starbucks';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class StarbucksService {

  constructor(private errorHandlerService: ErrorHandlerService, private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    estado: new FormControl(''), 
    ciudad: new FormControl(''),
    id_tienda: new FormControl(''),
    no_tienda: new FormControl(''),
    nombre: new FormControl(''),
    direccion: new FormControl(''),
    codigo_postal: new FormControl(''),
    longitud: new FormControl(''),
    latitud: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      $estado: '',
    });
  }

  getStarbucks(): Observable<IStarbucks[]>{
    return this.http.get<IStarbucks[]>("http://localhost:3001/starbucks", 
    {responseType: "json"})
    .pipe(tap((_) => console.log("Starbuks obtenidos.")),
    catchError(
        this.errorHandlerService.handleError<IStarbucks[]>("getStarbucks", [])
      )
    );
  }
}
