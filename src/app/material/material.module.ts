import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCardModule
  ]
})
export class MaterialModule { }
