import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorComponent} from './calculator.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NbButtonGroupModule, NbButtonModule, NbInputModule, NbRadioModule} from "@nebular/theme";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    NbRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonGroupModule,
    NbButtonModule,
    HttpClientModule
  ]
})
export class CalculatorModule {
}
