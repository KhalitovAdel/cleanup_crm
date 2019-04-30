import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.styl']
})
export class RegisterUserComponent implements OnInit {
  id: any;
  newUser: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private myHttp: myHTTPService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.newUser = this.fb.group({
      Name: ['Адель', Validators.required],
      Surname: ['Халитов', Validators.required],
      BirthDate: ['', Validators.required],
      password: ['adelADEL131', Validators.required]
    });

    this.getUser();
      
  }
  getUser() {
    this.myHttp.postHTTP('/public/getUser', { id: this.id})
      .subscribe(data=> {
        
      }, err => {
        console.log(err)
      })
  }
  finishUserRegistration() {
    this.myHttp.putHTTP('/public/finishUserRegistration', {id: this.id, user: this.newUser.value})
      .subscribe(data=> {
          console.log(data)
      }, err => {
        console.log(err)
      })
  }
}
