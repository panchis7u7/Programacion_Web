import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-starbucks',
  templateUrl: './starbucks.component.html',
  styleUrls: ['./starbucks.component.sass']
})
export class StarbucksComponent implements OnInit {

  centro!: google.maps.LatLngLiteral;
  starbuckMC!: google.maps.LatLngLiteral;

  constructor() {
   }

  ngOnInit(): void {
  navigator.geolocation.getCurrentPosition((pos) => {
    this.centro = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }

    this.starbuckMC = {
      lat: -35,
      lng: 90,
    }
  })
      
  }

}
