import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { OfferIntoLeadComponent } from '../../Offers/offer-into-lead/offer-into-lead.component';
import { AlertService } from 'src/app/services/alert/alert.service';


@Component({
  selector: 'app-lead-page',
  templateUrl: './lead-page.component.html',
  styleUrls: ['./lead-page.component.styl']
})

export class LeadPageComponent implements OnInit {
  id: String; //Полученный id из url
  private sub: any;
  
  changeIndicator: Boolean = false;

  PanelControl: Array<Object> = [
    {action: 'call', translate: 'Звонок'},
    {action: 'meet', translate: 'Встреча'},
    {action: 'task', translate: 'Задача'},
  ];

  LeadStatus: Array<Object> = [
    {status: 'identifyLPR', translate: 'Выявление ЛПР'},
    {status: 'attemptCommunicateLPR', translate: 'Попытка связаться с ЛПР'},
    {status: 'identifyNeed', translate: 'Выявление потребности у ЛПР'},
    {status: 'offerSended', translate: 'Отправленно КП'},
    {status: 'DoesntReqFurtherWork', translate: 'Не требует дальнейшей работы'},
  ];

  Lead: any = {
    leadId: String,
    leadStatus: String,
    contactPhones: [],
    comments: [],
    tasks: [] = []
  };

  taskDesk: FormGroup;

  taskPanelControl: Array<Object> = [
    {action: 'comment', translate: 'Комментарий'},
    {action: 'call', translate: 'Звонок'},
    {action: 'meet', translate: 'Встреча'},
    {action: 'task', translate: 'Задача'},
  ];

  TaskDesk: Array<any>;

  constructor(
    private alert: AlertService,
    private route: ActivatedRoute,
    private myHttp: myHTTPService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OfferIntoLeadComponent, {
      position: {
        'top': '0',
        'right': '0'
      },
      maxWidth: 'none',
      minWidth: '80vh',
      height: '100vh',
      data: {leadId: this.Lead.leadId}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.getLeadInfo();

    this.taskDesk = this.fb.group({
      actions: ['', Validators.required],
      description: ['', Validators.required],
      deadLineDate: ['', Validators.required]
    });

    this.taskDesk.valueChanges
    .subscribe(
      (value) => console.log(value)
    );

  }

  async getLeadInfo() {
      await this.myHttp.postHTTP('http://localhost:3000/getLeadInfo', {id: this.id} )
        .subscribe( data=>{
          console.log(data);
          this.Lead = data;
          this.sortTasks();
          return;
        }, err => {
          console.log('Error to load Lead Page: ' + err);
        });
  }

  setUpdeteToLead() {
    return this.myHttp.putHTTP('/updateLead', this.Lead);
  }

  sortTasks() {
    this.TaskDesk = this.Lead.tasks.concat(this.Lead.comments);
    this.TaskDesk.sort(function(a, b) {
      const
      aStatus:any = a.status !== 'started',
      bStatus:any = b.status !== 'started',
      aVal = a.finishedDate || a.createdDate,
      bVal = b.finishedDate || b.createdDate;

    return  (aStatus - bStatus) || Date.parse( bVal ) - Date.parse( aVal );
    });
  }

  changeTaskStatus(task) {
    console.log(task);
      this.myHttp.postHTTP('http://localhost:3000/changeStatus', {leadId: this.Lead.leadId, changedTask: task} )
        .subscribe( data=>{
          console.log(data);
          this.Lead = data;
          this.sortTasks();
          return;
        }, err => {
          console.log('Error to load Lead Page: ' + err);
        });
  }
  createNewTask() { //Проверка на заполняемость полей
    var data: Object;
    if (this.taskDesk.value.actions === 'comment') {
      data = {
        description: this.taskDesk.value.description,
        createdDate: new Date
      }
      this.myHttp.postHTTP('http://localhost:3000/createNewComment', {leadId: this.Lead.leadId, comment: data})
        .subscribe( updatedLead=> {
          this.Lead = updatedLead;
          this.sortTasks();
          console.log(this.Lead);
          return;
        }, err => {
          console.log('Error to add new Comment: ' + err);
        });

    } else {
      data = { // Может быть только 1 начатая задача
        status: 'started',
        action: this.taskDesk.value.actions,
        description: this.taskDesk.value.description,
        deadLineDate: this.taskDesk.value.deadLineDate,
        createdDate: new Date
      }
      this.myHttp.postHTTP('http://localhost:3000/createNewTask', {leadId: this.Lead.leadId, task: data})
        .subscribe( updatedLead=> {
          this.Lead = updatedLead;
          this.sortTasks();
          console.log(this.Lead);
          return;
        }, err => {
          console.log('Error to add new Comment: ' + err);
        });
    }
  }

  changeLeadStatus () {
    this.myHttp.postHTTP('http://localhost:3000/changeLeadStatus', 
    {
      leadId: this.Lead.leadId,
      leadStatus: this.Lead.leadStatus
    })
      .subscribe( (data: any) => {
         this.alert.openSnackBar( data.message );
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      });
  }

  preChangeLead(e, boolean: Boolean) {
    e.preventDefault();
    if (boolean === true) {
      return this.changeIndicator = true;
    }
    return this.changeIndicator = false;
  }

  addNewPhone(e) {
    e.preventDefault();
    return this.Lead.contactPhones.push('')
  }

  saveLeadChanges() {
    this.myHttp.postHTTP('http://localhost:3000/saveLeadChanges', {
      leadId: this.Lead.leadId,
      firmName: this.Lead.firmName,
      contactPhones: this.Lead.contactPhones,
      contactEmail: this.Lead.contactEmail,
      address: this.Lead.address,
      contactName: this.Lead.contactName,
      position: this.Lead.position,
      lprsName: this.Lead.lprsName
    })
      .subscribe( (data: any) => {
        this.alert.openSnackBar( data.message );
        this.changeIndicator = false;
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      });
  }
}
