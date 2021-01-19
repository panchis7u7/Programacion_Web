import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarbucksService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id_tienda: new FormControl(''),
    ciudad: new FormControl(''),
    codigo_postal: new FormControl(''),
    direccion: new FormControl(''),
    estado: new FormControl(''), 
    latitud: new FormControl(''),
    longitud: new FormControl(''),
    no_tienda: new FormControl(''),
    nombre: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      estado: '',
      ciudad: '',
      no_tienda: '',
      id_tienda: '',
      nombre: '',
      direccion: '',
      codigo_postal: '',
      longitud: '',
      latitud: '',
    });
  }

  populateForm(starbuck:any){
    /*this.form.setValue({
      estado: starbuck.estado,
      ciudad: starbuck.ciudad,
      no_tienda: starbuck.no_tienda,
      id_tienda: starbuck.id_tienda,
      nombre: starbuck.nombre,
      direccion: starbuck.direccion,
      codigo_postal: starbuck.codigo_postal,
      longitud: starbuck.longitud,
      latitud: starbuck.latitud
    });*/
    this.form.setValue(starbuck);
    console.log(starbuck);
  }
}
