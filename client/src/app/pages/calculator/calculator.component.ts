import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CalculatorService} from "./calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  optionType = [
    {value: 'call', label: 'Call'},
    {value: 'put', label: 'Put'},
  ];

  optionChoice = [];
  requestBody: any;
  responseData: any;

  bsmForm = new FormGroup({
    stockPrice: new FormControl(''),
    strikePrice: new FormControl(''),
    timeToMaturity: new FormControl(''),
    riskFreeRate: new FormControl(''),
    volatility: new FormControl('')
  })

  constructor(private calculatorService: CalculatorService) {
  }

  submitForm() {
    this.requestBody = this.bsmForm.value;
    this.calculatorService.requestData.next(this.requestBody);

    Object.keys(this.requestBody).forEach(key => {
      this.requestBody[key] = Number(this.requestBody[key]);
    })

    this.requestBody['optionType'] = this.optionChoice;
    this.calculatorService.submitData(this.requestBody);
  }

  parseResponse() {
    return this.responseData['contract_price'];
  }

  ngOnInit(): void {
    this.requestBody = this.calculatorService.requestData.getValue();
    Object.keys(this.requestBody).forEach(key => {
      if (key !== 'optionType') {
        this.bsmForm.get(key)?.setValue(this.requestBody[key]);
      }
    })

    this.optionChoice = this.requestBody['optionType'] || [];

    this.calculatorService.observeResponse().subscribe((data: any) => {
      this.responseData = data;
    }, (error => {
      console.error("Something went wrong", error);
    }))
  }
}
