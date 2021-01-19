import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarbucksService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id_tienda: new FormControl(''),
    ciudad: new FormControl('', Validators.required),
    codigo_postal: new FormControl(''),
    direccion: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required), 
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
    no_tienda: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
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

  deleteStarbuck(starbuck:any){
    this.http.post("http://localhost:3001/starbucks/delete", starbuck).subscribe(
      result => {
        console.log('success');
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  editStarbuck(starbuck:any){
    this.http.post("http://localhost:3001/starbucks/update", starbuck).subscribe(
            result => {
              console.log('success');
              console.log(result);
            },
            error => {
              console.log(error);
            }
          );
  }

  populateForm(starbuck:any){
    this.form.setValue({
      $key: starbuck.id_tienda,
      estado: starbuck.estado,
      ciudad: starbuck.ciudad,
      no_tienda: starbuck.no_tienda,
      id_tienda: starbuck.id_tienda,
      nombre: starbuck.nombre,
      direccion: starbuck.direccion,
      codigo_postal: starbuck.codigo_postal,
      longitud: starbuck.longitud,
      latitud: starbuck.latitud
    });
    //this.form.setValue(starbuck);
    console.log(starbuck);
  }
}
