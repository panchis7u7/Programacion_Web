import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StarbucksService } from '../../shared/starbucks.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-starbuck',
  templateUrl: './starbuck.component.html',
  styleUrls: ['./starbuck.component.sass']
})
export class StarbuckComponent implements OnInit {

  constructor(public service: StarbucksService, private fb: FormBuilder, 
    private http: HttpClient,
    private dialogRef: MatDialogRef<StarbuckComponent>) { }

  ngOnInit(): void {
    /* this.service.form = this.fb.group({
      estado: '',
      ciudad: '',
      id_tienda: '',
      no_tienda: '',
      nombre: '',
      direccion: '',
      codigo_postal: '',
      longitud: '',
      latitud: '',
    }); */
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    console.log(this.service.form.getRawValue());
    const formData = this.service.form.getRawValue();

    const data = {
      estado: formData.estado,
      ciudad: formData.ciudad,
      no_tienda: formData.no_tienda,
      id_tienda: formData.id_tienda,
      nombre: formData.nombre,
      direccion: formData.direccion,
      codigo_postal: formData.codigo_postal,
      longitud: formData.longitud,
      latituda: formData.latitud,
      scope: '*',
    }
    
    this.http.post("http://localhost:3001/starbucks/add", data).subscribe(
      result => {
        console.log('success');
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
