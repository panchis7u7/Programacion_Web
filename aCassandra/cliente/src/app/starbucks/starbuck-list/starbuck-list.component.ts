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
  starbucks: Observable<IStarbucks[]>;
  displayedColumns: string[] = ['estado'];
  //post:any = [];

  constructor(private service: StarbucksService) {
    /*this.service.getStarbucks().subscribe(data => {
      this.post.push(data);
      
    this.listData = new MatTableDataSource(this.post); 
    });*/
  }

  ngOnInit(): void {
    this.starbucks = this.service.getStarbucks();
    console.log(this.starbucks);
  }

}
