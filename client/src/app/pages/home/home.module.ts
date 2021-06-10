import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ]
})
export class HomeModule { }
