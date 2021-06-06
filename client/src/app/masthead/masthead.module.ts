import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MastheadComponent} from './masthead.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    MastheadComponent
  ],
  exports: [
    MastheadComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MastheadModule {
}
