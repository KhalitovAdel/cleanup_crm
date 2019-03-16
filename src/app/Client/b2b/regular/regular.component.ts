import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculateService } from 'src/app/services/calculate/calculate.service';

@Component({
  selector: 'app-regular',
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.styl']
})
export class RegularComponent implements OnInit {

  CalculateControl: FormGroup;

  Result: any = {
    fot: Number,
    itog: Number,
    itogMaterial: Number,
    managerWage: Number,
    material: Number,
    profit: Number,
    tinkoffCommission: Number,
    windowFond: Number,
  };
  displayeditog: String;
  displayeditogLast: String;

  RegularControl: Array<Object> = [
    {days: '30', translate: 'Без выходных'},
    {days: '25.8', translate: '6/1 - сб полный'},
    {days: '23.7', translate: '6/1 - сб не полный'},
    {days: '21.5', translate: '5/2'},
    {days: '15', translate: '2/2'},
    {days: '13', translate: '3 раза в неделю'},
    {days: '8.6', translate: '2 раза в неделю'},
    {days: '4.3', translate: 'Раз в неделю'},
    {days: '1', translate: 'Раз в месяц'}
  ];
  constructor(
    private fb: FormBuilder,
    private svc: CalculateService,
  ) { }

  ngOnInit() {

    this.CalculateControl = this.fb.group({
      area: ['', Validators.required],
      regular: ['', Validators.required],
      time: '',
      twice: false
    });

    this.CalculateControl.valueChanges
    .subscribe(
      (value) => value
    );

  }

  calculate() {
    if ( this.CalculateControl.get('area').value > 0 && this.CalculateControl.get('regular').value > 0 ) {

      this.Result = ( this.svc.getCalculate(
        this.CalculateControl.get('area').value, 
        this.CalculateControl.get('regular').value,
        this.CalculateControl.get('time').value,
        this.CalculateControl.get('twice').value,
      ));
      this.displayeditog = (Math.round( this.Result.itog / 4 ) ).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      console.log(this.Result);

    }
  }

}
