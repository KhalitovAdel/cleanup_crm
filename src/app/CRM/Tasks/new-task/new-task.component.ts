import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.styl']
})
export class NewTaskComponent implements OnInit {
  action: Object = {
    call: 'Звонок', 
    meet: 'Встреча'
  };
  Task: Object = {
    actionValue: '',
    dealWhenDo: Date,
    description: ''
  };
  constructor() { }

  ngOnInit() {
  }

}
