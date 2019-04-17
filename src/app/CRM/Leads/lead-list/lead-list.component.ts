import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface Lead {
  firmName: String;
  address: String;
  tasks: [
    {
      action: String,
      createdDate: Date,
      deadLineDate: Date,
      description: String,
      status: String
    }
  ];
  createdDate: Date;
}

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.styl']
})
export class LeadListComponent implements OnInit {
  Leads: Array<any>;
  dataSource;
  displayedColumns: string[] = ['firmName', 'tasks', 'address', 'createdDate'];

  LeadStatus: any = [
    {status: 'rawLead', translate: 'Не обработан'},
    {status: 'identifyLPR', translate: 'Выявление ЛПР'},
    {status: 'attemptCommunicateLPR', translate: 'Попытка связаться с ЛПР'},
    {status: 'identifyNeed', translate: 'Выявление потребности'},
    {status: 'offerSended', translate: 'Отправленно КП'},
    {status: 'DoesntReqFurtherWork', translate: 'Не требует дальнейшей работы'},
    {status: 'converted', translate: 'Сконвертирован'},
  ];

  partnersSliderOption = {
    loop:false,
    margin:10,
    nav: true,
    dots:false,
    autoplay:false,
    center:false,
    autoWidth:true,
    touchDrag:false,
    mouseDrag:false
  };

  constructor(
    private myHttp: myHTTPService
  ) {
  }

  ngOnInit() {
    this.getLeadList();
  }
  async getLeadList() {
    await this.myHttp.getHTTP('/getLeadList')
      .subscribe( (data: [])=> {
        this.Leads = data;
        this.refreshDataSource(this.Leads);
        console.log(this.LeadStatus)
        return;
      }, err => {
        console.log('Get all Leads error: ' + err);
      });
  };

  refreshDataSource(data) {
    for(let x in this.LeadStatus) {
      this.LeadStatus[x]['leads'] = [];
      for (let y in data) {
        if (this.LeadStatus[x].status === data[y].details.leadStatus) {
          this.LeadStatus[x].leads.push(data[y]);
        }
      }
    }
  }
  
  todayTasks() {
    var today: Date = new Date,
    tomorrow: Date = new Date,
    array: Array<Object> = [];
    today = this.nulledDay(today);
    tomorrow = this.nulledDay(tomorrow);
    tomorrow.setDate(tomorrow.getDate() + 1);
    var newToday = Date.parse(today.toISOString()),
    newTomorrow = Date.parse(tomorrow.toISOString());
    var deadLine: Number;
    for (let x of this.Leads) {
     for(let y of x.tasks) {
        deadLine = Date.parse( y.deadLineDate.toString() );
      if (y.status === 'started' && deadLine > newToday && deadLine < newTomorrow ) {
        array.push(x);
      }
     }
    }
    this.refreshDataSource(array);
  }

  todayTasksLead(lead) {
    var today: Date = new Date,
    tomorrow: Date = new Date,
    array: Array<Object> = [];
    today = this.nulledDay(today);
    tomorrow = this.nulledDay(tomorrow);
    tomorrow.setDate(tomorrow.getDate() + 1);
    var newToday = Date.parse(today.toISOString()),
    newTomorrow = Date.parse(tomorrow.toISOString());
    var deadLine: Number;
     for(let y of lead.tasks) {
        deadLine = Date.parse( y.deadLineDate.toString() );
      if (y.status === 'started' && deadLine > newToday && deadLine < newTomorrow ) {
        return true
      }
     }
    return false
  }

  overDateTasks() {
    var today: Date = new Date,
    array: Array<Object> = [];
    today = this.nulledDay(today);
    var newToday = Date.parse(today.toISOString());
    var deadLine: Number;
    for (let x of this.Leads) {
     for(let y of x.tasks) {
        deadLine = Date.parse( y.deadLineDate.toString() );
      if (y.status === 'started' && deadLine < newToday ) {
        array.push(x);
      }
     }
    }
    this.refreshDataSource(array);
  }

  overDateTasksLead(lead) {
    var today: Date = new Date,
    today = this.nulledDay(today);
    var newToday = Date.parse(today.toISOString());
    var deadLine: Number;

    for(let y of lead.tasks) {
        deadLine = Date.parse( y.deadLineDate.toString() );
      if (y.status === 'started' && deadLine < newToday ) {
        return true;
      }
    }
    return false;
  }
  noTasks() {
    var array: Array<Object> = [];
    for (let x of this.Leads) {
      var counter = 0;
      var hasornot = 0;
      for(let y of x.tasks) {
        
       if ( (y.status != 'started') ) {
        hasornot = 1;
       }
       counter = counter + 1;
       if (counter == x.tasks.length && hasornot > 0) {
        array.push(x);
       }
      }
     }
     this.refreshDataSource(array);
  }
  noTasksLead(lead) {
    var array: Array<Object> = [];
      var counter = 0;
      var hasornot = 0;
      for(let y of lead.tasks) {
        
       if ( (y.status != 'started') ) {
        hasornot = 1;
       }
       counter = counter + 1;
       if (counter == lead.tasks.length && hasornot > 0) {
        return true;
       }
      }
     return false;
  }
  
  allLeads() {
    this.refreshDataSource(this.Leads);
  }
  nulledDay(day: Date) {
    day.setHours(0); day.setMinutes(0);
    day.setSeconds(0); day.setMilliseconds(0);
    return day;
  }
}