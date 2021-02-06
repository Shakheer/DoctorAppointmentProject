import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerDatepick : Partial<BsDatepickerConfig>;
  RegisterForm : FormGroup;
  constructor(private userservice: UserServiceService) { 
    this.registerDatepick = Object.assign({},{
      dateInputFormat : 'DD/MM/YYYY'
    });
  }
  
  ngOnInit(){

    this.RegisterForm = new FormGroup({
      name : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]{3,15}$')]),
      userName : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]{3,8}$')]),
      password : new FormControl(null),
      guardianName : new FormControl(null),
      address : new FormControl(null),
      email : new FormControl(null),
      gender : new FormControl(null),
      maritalStatus : new FormControl(null),
      contact : new FormControl(null),
      dob : new FormControl(null),
      dor : new FormControl(null)
    });
  }
  onRegisterClick(){
    this.RegisterForm.controls.dor.setValue(new Date());
    console.log(JSON.stringify(this.RegisterForm.value));
    this.userservice.registerUser(this.RegisterForm.value).subscribe(
      response => {console.log('Success',response);
      alert("User registration Successful!");},
      error => {console.log('Failed to register User!',error);}
    )
  }
}
