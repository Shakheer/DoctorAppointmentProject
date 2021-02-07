import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerDatepick : Partial<BsDatepickerConfig>;
  RegisterForm : FormGroup;
  constructor(private userservice: UserServiceService, private _route: Router) { 
    this.registerDatepick = Object.assign({},{
      dateInputFormat : 'DD/MM/YYYY'
    });
  }
  
  ngOnInit(){

    this.RegisterForm = new FormGroup({
      name : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]{3,15}$')]),
      userName : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]{3,8}$')]),
      password : new FormControl('',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]),
      guardianName : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]{3,15}$')]),
      address : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9, ]{5,50}$')]),
      email : new FormControl('',[Validators.required,Validators.email]),
      gender : new FormControl('Male'),
      maritalStatus : new FormControl(null,Validators.required),
      contact : new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}$')]),
      dob : new FormControl('',[Validators.required, ValidationService.dobValidator]),
      dor : new FormControl(null)
    });
  }
  onRegisterClick(){
    this.RegisterForm.controls.dor.setValue(new Date());
    console.log(JSON.stringify(this.RegisterForm.value));
    this.userservice.registerUser(this.RegisterForm.value).subscribe(
      (response:any) => {
      alert("User registration Successful!");
      this._route.navigate(['usersignin'])
    },
      (error:any) => {console.log('Failed to register User!',error);}
    );
  }
}
