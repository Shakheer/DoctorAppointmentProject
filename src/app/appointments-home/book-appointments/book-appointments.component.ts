import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentsModel } from 'src/app/Models/appointments-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css']
})
export class BookAppointmentsComponent implements OnInit {
  bookAptDatepick : Partial<BsDatepickerConfig>;
  AppointmentForm : FormGroup;
  appointid: string;
  pageTitle: string = "Book Appointment";
  constructor(private _datepipe : DatePipe ,private _route: Router, private _aroute: ActivatedRoute ,private _appointmentService: AppointmentService) { 
    this.bookAptDatepick = Object.assign({},{
      dateInputFormat : 'DD/MM/YYYY'
    });
  }

  ngOnInit(): void {
  this.appointid = this._aroute.snapshot.paramMap.get('aid');
  console.log('aid :'+ this.appointid);
    if(this.appointid !== null){
      this.pageTitle = "Update Appointment";
      this._appointmentService.getAppointment(this.appointid).subscribe(
        (res:any) => {console.log(res);
          this.AppointmentForm.patchValue({
            hospital : res.hospital,
            doctor : res.doctor,
            doa : new Date(res.doa),
            time : res.time,
            state : res.state
          });
        },
        err=>{}
      )
    }
    else{
      this.pageTitle = "Create Appointment";
    }

    this.AppointmentForm = new FormGroup({
      hospital : new FormControl(),
      doctor : new FormControl(),
      doa : new FormControl(null),
      time : new FormControl(null),
      state : new FormControl(null)
    });
  }
  OnSubmitClick(){

    console.log(this.AppointmentForm.value);
    this._appointmentService.bookAppointment(this.AppointmentForm.value).subscribe(
      (response:any) => {console.log('Success',response);
      this._route.navigate(['ViewAppointments']);
    },
      (error:any) => {
        if(error.status == 400){
        alert("Invalid Credentials");
        console.log('Success',error);
        }
        else{
          console.log(error);
        }
    }
    );
  }

  OnUpdateClick(){
    console.log(this.AppointmentForm.value);
    
    this._appointmentService.updateAppointment(this.appointid, this.AppointmentForm.value).subscribe(
      (response:any) => {console.log('Success',response);
      this._route.navigate(['home/viewappointment']);
    },
      (error:any) => {
        if(error.status == 400){
        alert("Invalid Credentials");
        console.log('Success',error);
        }
        else{
          console.log(error);
        }
    }
    );
  }

  OnResetClick(){
    this.AppointmentForm.reset();
  }

  OnCancelClick(){
    this._route.navigate(['ViewAppointments']);
  }
}
