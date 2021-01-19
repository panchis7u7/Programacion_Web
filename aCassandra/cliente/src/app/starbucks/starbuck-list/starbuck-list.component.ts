import { Component, OnInit, ViewChild } from '@angular/core';
import { StarbucksService } from '../../shared/starbucks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StarbuckComponent } from '../starbuck/starbuck.component';

@Component({
  selector: 'app-starbuck-list',
  templateUrl: './starbuck-list.component.html',
  styleUrls: ['./starbuck-list.component.sass']
})
export class StarbuckListComponent implements OnInit {

  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id_tienda', 'estado', 'ciudad', 'no_tienda', 'nombre', 'codigo_postal', 'direccion', 'latitud', 'longitud', 'actions'];
  post:any = [];
  searchKey!:string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: StarbucksService,
    private dialog: MatDialog){};

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

  onSearchClear(){
    this.searchKey = "";
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StarbuckComponent, dialogConfig);
  }

  onEdit(row:any){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StarbuckComponent, dialogConfig);
  }

  onDelete($key:string){
    if(confirm('Estas seguro que quieres borrar este registro?')){
      
    }
  }
}
