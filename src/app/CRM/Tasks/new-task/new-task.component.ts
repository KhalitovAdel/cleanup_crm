import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { DatePipe } from '@angular/common';

export class Comment {
  comment: string;
  createdDate: Date;
}

export class Task {
    _id: string;
    actionValue: string;
    description: string;
    taskWhenDo: Date;
    lead_id: string;
    createdDate: Date;
}

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.styl'],
  providers: [DatePipe]
})

export class NewTaskComponent implements OnInit {

  dataTasks: any[] = new Array();
  action = {
    call: 'Звонок', 
    meet: 'Встреча',
    comment: 'Комментарий',
    task: 'Задача'
  };
  Task = {
    actionValue: '',
    description: '',
    taskWhenDo: Date,
    lead_id: '',
    createdDate: ''
  };
  showDateInput() {
    if (this.Task.actionValue != 'comment') {
      return true;
    }
    return false;
  }
  constructor(
    private myHTTP: myHTTPService,
    private datePipe: DatePipe,
  ) {
    
  }

  ngOnInit() {
    this.getTasks();
  }
  ngOnChanges() {
    this.getTasks();
    console.log('Пришли изменения');
  }

  setNewTask() {
    this.Task.createdDate = this.datePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss.SSS'Z'");
    if (this.Task.actionValue == 'comment') {
      this.myHTTP.postHTTP('/createNewComment', {
        _id: this.Task.lead_id, 
        comment: this.Task.description,
        createdDate: this.Task.createdDate
      });
      return this.getTasks();
    }
    this.Task.lead_id = this.Task.lead_id;
    this.myHTTP.postHTTP('/createNewTask', this.Task);
    return this.getTasks();
  }
  async getTasks() {
    console.log(this.Task.lead_id);
    
    
    var dataTask = await this.myHTTP.postHTTP('/getTasks', {lead_id: this.Task.lead_id})
    .then( (res: Array<Object>) => {
      return res;
    });
    var dataComment = await this.myHTTP.postHTTP('/getComments', {_id: this.Task.lead_id})
    .then( (res: Array<Object>) => {
      return res;
    });
    console.log(dataTask);
    console.log(dataComment);
    return this.dataTasks = dataTask.concat(dataComment);
  }
}
