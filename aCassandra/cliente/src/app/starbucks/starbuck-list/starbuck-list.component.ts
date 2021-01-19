import { Component, OnInit, ViewChild } from '@angular/core';
import { StarbucksService } from '../../shared/starbucks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-starbuck-list',
  templateUrl: './starbuck-list.component.html',
  styleUrls: ['./starbuck-list.component.sass']
})
export class StarbuckListComponent implements OnInit {

  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['estado', 'ciudad', 'id_tienda', 'no_tienda', 'nombre', 'codigo_postal', 'direccion', 'latitud', 'longitud', 'actions'];
  post:any = [];
  searchKey!:string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: StarbucksService) {
  }

  getSimpleStarbucks() {
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
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      console.log('Tamaño: ', this.listData.data.length);
    })
    .catch((error) => console.log("error: ", error));
  }

  ngOnInit(): void {
    this.getSimpleStarbucks();
  }
}
