import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Metrika } from 'ng-yandex-metrika';

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
    private metrika: Metrika
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    
  }

  sentOffer() {
    if ( !(this.phone.indexOf('_') + 1) ) {
      this.myHttp.order(`<p><span style="font-weight: 700">Номер телефона: </span>${this.phone}</p>`)
        .subscribe( (data: any) => {
          this.alert.openSnackBar( 'Успешно отправлено' );
          this.metrika.fireEvent('form-default');
        }, ( err: any ) => {
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
