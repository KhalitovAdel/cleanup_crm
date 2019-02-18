import {EventEmitter} from '@angular/core';

export class ShareService {
  private leadId:string = '';
  
  onChange:EventEmitter<string> = new EventEmitter();

  public shareVarible (some){
      this.leadId = some;
    this.onChange.emit(this.leadId);
  }

}