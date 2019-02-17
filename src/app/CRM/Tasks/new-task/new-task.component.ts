import { Component, OnInit, Input } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.styl']
})

export class NewTaskComponent implements OnInit {
  @Input() _id: string;
  dataTasks: {};
  action = {
    call: 'Звонок', 
    meet: 'Встреча'
  };
  Task = {
    actionValue: '',
    description: '',
    taskWhenDo: Date,
    lead_id: '',
    createdDate: Date
  };
  constructor(
    private myHTTP: myHTTPService
  ) { }

  ngOnInit() {
    this.getTasks();
  }
  ngOnChanges() {

      this.getTasks();

  }
  setNewTask() {
    this.Task.lead_id = this._id;
    this.myHTTP.postHTTP('/createNewTask', this.Task);
    return this.getTasks();
  }
  async getTasks() {
    var data = await this.myHTTP.postHTTP('/getTasks', {lead_id: this._id}).then(res => {
      return res;
    });
    console.log(data);
    return this.dataTasks = data;
  }
}
