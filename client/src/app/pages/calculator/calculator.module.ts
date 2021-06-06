import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorComponent} from './calculator.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CalculatorModule {
}
