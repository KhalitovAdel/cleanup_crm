import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-consumables',
  templateUrl: './consumables.component.html',
  styleUrls: ['./consumables.component.styl']
})
export class ConsumablesComponent implements OnInit {
  MaterialControl: FormGroup;
  
  AllMaterial: Array<object>;

  ConsumablesType: Array<object> = [
    {key: 'window', translate: 'Для мытья окон'},
    {key: 'inventory', translate: 'Инвентарь'},
    {key: 'chemistry', translate: 'Химия'},
  ];

  constructor(
    private myhttp: myHTTPService,
    private fb: FormBuilder,
  ) { }
  
  ngOnInit() {
    this.MaterialControl = this.fb.group({
      type: '',
      name: '',
      urlLink: '',
      price: Number,
      expluotation: Number,
      norms: Number,
      area: Number,
      volume: Number,
      description: '',
    });

    this.MaterialControl.valueChanges
        .subscribe(
          (value) => console.log(value)
        );

    this.getMaterialList();
  }

  createNewMaterial() {
    this.myhttp.postHTTP('/crm/config/createNewMaterial', this.MaterialControl.value)
      .subscribe(data=> {
        console.log(data);
        this.MaterialControl.reset();
        this.getMaterialList();
      }, err => {
        console.log(err)
      })
  }

  getMaterialList() {
    this.myhttp.getHTTP('/crm/config/getMaterialList')
      .subscribe( (data: Array<object>)=> {
        console.log(data)
        this.AllMaterial = data;
      }, err => {
        console.log(err)
      })
  }

}
