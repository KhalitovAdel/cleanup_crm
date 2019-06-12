import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.styl']
})
export class DialogComponent implements OnInit {
  phoneMask = [ '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  phone: String;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private myHttp: myHTTPService,
    private alert: AlertService,
    private angulartics2: Angulartics2
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    
  }

  sentOffer() {
    if ( !(this.phone.indexOf('_') + 1) ) {
      this.myHttp.order(`<p><span style="font-weight: 700">Номер телефона: </span>${this.phone}</p>`)
        .subscribe( (data: any) => {
          this.alert.openSnackBar( 'Успешно отправлено' );
          this.angulartics2.eventTrack.next({
            action: 'send_form',
          })
        }, ( err: any ) => {
          console.log(err)
          this.alert.openSnackBar( 'У нас какие то проблемы, пожалуйста позвоните нам, мы не получим ваше обращение' );
        })
    } else {
      this.alert.openSnackBar('Введите корректный номер телефона');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
