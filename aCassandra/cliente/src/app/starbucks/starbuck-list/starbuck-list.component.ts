import { Component, OnInit } from '@angular/core';
import { StarbucksService } from '../../shared/starbucks.service';
import { Observable } from 'rxjs';
import { IStarbucks } from '../../Models/Starbucks';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-starbuck-list',
  templateUrl: './starbuck-list.component.html',
  styleUrls: ['./starbuck-list.component.sass']
})
export class StarbuckListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['estado', 'ciudad', 'id_tienda', 'no_tienda', 'nombre', 'codigo_postal', 'direccion', 'latitud', 'longitud', 'actions'];
  post:any = [];

  constructor(private service: StarbucksService) {
    this.listData = new MatTableDataSource();
  }

  getSimpleStarbucks() {
    //return this.http.get("http://localhost:3001/starbucks");
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:3001/starbucks", {
      method: "GET",
      headers: headers,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log("Resultado: ", resultado.response.rows);
      this.listData = new MatTableDataSource(resultado.response.rows);
    })
    .catch((error) => console.log("error: ", error));
  }

  ngOnInit(): void {
    this.getSimpleStarbucks();
  }
}
