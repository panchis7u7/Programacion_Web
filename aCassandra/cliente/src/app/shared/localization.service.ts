import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    latitud: new FormControl(''),
    longitud: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      latitud: '',
      longitud: '',
    });
  }
}
