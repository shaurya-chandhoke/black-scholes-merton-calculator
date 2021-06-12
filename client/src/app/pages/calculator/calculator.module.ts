import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorComponent, ErrorModalComponent} from './calculator.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [
    CalculatorComponent,
    ErrorModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
  ]
})
export class CalculatorModule {
}
