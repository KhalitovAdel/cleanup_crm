import { Component, OnInit, Input } from '@angular/core';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-finaly-offer',
  templateUrl: './finaly-offer.component.html',
  styleUrls: ['./finaly-offer.component.styl']
})
export class FinalyOfferComponent implements OnInit {
  @Input() Offer: any;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      //width: '250px',
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
