import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../shared/localization.service';

@Component({
  selector: 'app-starbucks',
  templateUrl: './starbucks.component.html',
  styleUrls: ['./starbucks.component.sass']
})
export class StarbucksComponent implements OnInit {

  centro!: google.maps.LatLngLiteral;
  star!: google.maps.LatLngLiteral;

  constructor(public service:LocalizationService) {
   }

  ngOnInit(): void {
  navigator.geolocation.getCurrentPosition((pos) => {
    this.centro = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }
  })
  }

  onClick(){
    if(this.service.form.valid){
      const formData = this.service.form.getRawValue();
        const data = {
            $key: '',
            latitud: formData.latitud,
            longitud: formData.longitud,
          }
      if(data.latitud == "" && data.longitud == ""){
        console.log("GPS");
        navigator.geolocation.getCurrentPosition((pos) => {
          this.centro = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }
        })
        this.sendLocalization(this.centro.lat, this.centro.lng);
      } else {
        console.log("Manual");
        this.centro = {
          lat: parseFloat(data.latitud),
          lng: parseFloat(data.longitud),
        }
        this.sendLocalization(data.latitud, data.longitud);
      }
    }
  }

  sendLocalization(lat:any, long:any){
    let headers = new Headers();
    let body = JSON.stringify({lat: lat, lng: long});
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:3001/starbucks/search", {
      method: "POST",
      headers: headers,
      body: body,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log("Resultado1: ", resultado.response);
      this.star = {
        lat: parseFloat(resultado.response["0"].latitude),
        lng: parseFloat(resultado.response["0"].longitude)
      }
    })
    .catch((error) => console.log("error: ", error));
  }
}
