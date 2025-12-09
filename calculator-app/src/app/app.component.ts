import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  display: string = '0';
  currentValue: number = 0;
  previousValue: number = 0;
  operation: string = '';
  resetDisplay: boolean = false;

  appendNumber(num: string): void {
    if (this.resetDisplay) {
      this.display = num;
      this.resetDisplay = false;
    } else {
      this.display = this.display === '0' ? num : this.display + num;
    }
  }

  appendDecimal(): void {
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  clear(): void {
    this.display = '0';
    this.currentValue = 0;
    this.previousValue = 0;
    this.operation = '';
    this.resetDisplay = false;
  }

  setOperation(op: string): void {
    if (this.operation && !this.resetDisplay) {
      this.calculate();
    }
    this.previousValue = parseFloat(this.display);
    this.operation = op;
    this.resetDisplay = true;
  }

  calculate(): void {
    if (!this.operation) return;

    this.currentValue = parseFloat(this.display);
    let result: number = 0;

    switch (this.operation) {
      case '+':
        result = this.previousValue + this.currentValue;
        break;
      case '-':
        result = this.previousValue - this.currentValue;
        break;
      case '*':
        result = this.previousValue * this.currentValue;
        break;
      case '/':
        if (this.currentValue === 0) {
          this.display = 'Error';
          this.clear();
          return;
        }
        result = this.previousValue / this.currentValue;
        break;
    }

    this.display = result.toString();
    this.operation = '';
    this.resetDisplay = true;
  }
}
