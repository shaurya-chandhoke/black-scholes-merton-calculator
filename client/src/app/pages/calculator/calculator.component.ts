import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  optionType = new FormControl('');
  stockPrice = new FormControl('');
  strikePrice = new FormControl('');
  timeToMaturity = new FormControl('');
  riskFreeRate = new FormControl('');
  volatility = new FormControl('');

  name = new FormControl('');
  constructor() {
  }

  ngOnInit(): void {
  }
}
