import { Component, OnInit } from '@angular/core';
import { StarbucksService } from '../../shared/starbucks.service';

@Component({
  selector: 'app-starbuck',
  templateUrl: './starbuck.component.html',
  styleUrls: ['./starbuck.component.sass']
})
export class StarbuckComponent implements OnInit {

  constructor(public service: StarbucksService) { }

  ngOnInit(): void {
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
}
