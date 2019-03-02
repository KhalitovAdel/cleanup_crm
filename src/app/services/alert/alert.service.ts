import { Injectable, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar,) { }

  openSnackBar(newData) {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 2000,
      data: newData
    });
  };
}

@Component({
  selector: 'snack-bar',
  template: '<span class="alert">{{data}}</span>',
  styles: [`
    .alert {
      color: hotpink;
    }
  `],
})
export class AlertComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
