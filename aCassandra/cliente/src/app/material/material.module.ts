import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material/toolbar';
import * as GridMaterial from '@angular/material/grid-list';
import * as ListMaterial from '@angular/material/list';
import * as InputMaterial from '@angular/material/input';
import * as FormMaterial from '@angular/material/form-field';
import * as ButtonMaterial from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    GridMaterial.MatGridListModule,
    InputMaterial.MatInputModule,
    FormMaterial.MatFormFieldModule,
    ListMaterial.MatListModule,
    ButtonMaterial.MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  exports : [
    Material.MatToolbarModule,
    GridMaterial.MatGridListModule,
    InputMaterial.MatInputModule,
    FormMaterial.MatFormFieldModule,
    ListMaterial.MatListModule,
    ButtonMaterial.MatButtonModule,
    MatTableModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
