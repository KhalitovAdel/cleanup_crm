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
  Leads: Lead[];
  dataSource;
  displayedColumns: string[] = ['firmName', 'tasks', 'address', 'createdDate'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private myHttp: myHTTPService
  ) {
  }

  ngOnInit() {
    this.getLeadList();
  }
  async getLeadList() {
    await this.myHttp.getHTTP('http://localhost:3000/getLeadList')
      .subscribe( (data: Lead[])=> {
        this.Leads = data;
        this.refreshDataSource(this.Leads);
        return;
      }, err => {
        console.log('Get all Leads error: ' + err);
      });
  };

  refreshDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  
  allLeads() {
    this.refreshDataSource(this.Leads);
  }
  nulledDay(day: Date) {
    day.setHours(0); day.setMinutes(0);
    day.setSeconds(0); day.setMilliseconds(0);
    return day;
  }
}