import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StarbucksService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    $estado: new FormControl(''), 
    $ciudad: new FormControl(''),
    $id_tienda: new FormControl(''),
    $no_tienda: new FormControl(''),
    $nombre: new FormControl(''),
    $direccion: new FormControl(''),
    $codigo_postal: new FormControl(''),
    $longitud: new FormControl(''),
    $latitud: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      $estado: '',
    })
  }
}
