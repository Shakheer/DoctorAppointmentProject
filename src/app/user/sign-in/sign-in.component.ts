import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm : FormGroup;
  constructor(private route: Router, private userservice: UserServiceService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      userName : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]{3,8}$')]),
      password : new FormControl('', Validators.required)
    });
  }
  onSubmitClick(){ console.log(this.signInForm.value);
    this.userservice.authenticateUser(this.signInForm.value).subscribe(
      (response:any) => {console.log('Success',response);
    localStorage.setItem("token", response.token);
    //localStorage.setitem("username", "abc");
      // this.setToLocalStorage(response, this.signInForm.controls.userName.value);
      this.route.navigate(['home/viewappointment']);},
      (error:any) => {
        if(error.status == 400){
        alert("Invalid Credentials");
        console.log('Success',error);
        }
    }
    );
    //this.route.navigate(['ViewAppointments']);
  }

  // setToLocalStorage(obj1, obj2)
  // {
  //   localStorage.setItem('token',obj1.token);
  //   localStorage.setitem('username', obj2);
  // }
}