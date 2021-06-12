import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CalculatorService} from "./calculator.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  responseData: any;

  bsmForm = new FormGroup({
    optionType: new FormControl(),
    stockPrice: new FormControl(),
    strikePrice: new FormControl(),
    timeToMaturity: new FormControl(),
    riskFreeRate: new FormControl(),
    volatility: new FormControl()
  })


  constructor(private calculatorService: CalculatorService, public dialog: MatDialog) {
  }

  determineError() {
    if (!this.bsmForm.value['optionType']) {
      this.dialog.open(ErrorModalComponent);
    }
  }

  submitForm() {
    console.log(this.bsmForm.valid);
    if (this.bsmForm.valid) {
      // Create copy of current submission data to avoid resetting form
      let cachedFormData = Object.assign({}, this.bsmForm.value);

      // Minor data cleanup
      this.bsmForm.value['riskFreeRate'] /= 100;
      this.bsmForm.value['volatility'] /= 100;

      this.calculatorService.submitData(this.bsmForm.value);

      // Reapply original copy
      this.bsmForm.reset(cachedFormData)
      this.bsmForm.markAsUntouched();
      this.bsmForm.markAsPristine();
    } else {
      this.determineError();
    }
  }

  parseResponse() {
    return this.responseData['contract_price'];
  }

  watchResults() {
    this.calculatorService.observeResponse().subscribe((data: any) => {
      this.responseData = data;
    }, (error => {
      console.error("Something went wrong", error);
    }));
  }

  ngOnInit(): void {
    this.watchResults();
  }
}

@Component({
  selector: 'error-modal',
  template: `
    <div style="text-align: center">
      <h1 mat-dialog-title>Error</h1>
      <div mat-dialog-content>Please select the type of option contract</div>
      <div mat-dialog-actions style="display: flex; justify-content: center">
        <button mat-button mat-dialog-close>Okay</button>
      </div>
    </div>
  `
})
export class ErrorModalComponent {
}
