import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentsModel } from 'src/app/Models/appointments-model';
import { DatePipe } from '@angular/common';
import { Hospital } from 'src/app/Models/hospital';
import { Doctor } from 'src/app/Models/doctor';

@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css']
})
export class BookAppointmentsComponent implements OnInit {
  bookAptDatepick : Partial<BsDatepickerConfig>;
  AppointmentForm : FormGroup;
  appointid: string;
  hospitals: Hospital[];
  doctors: Doctor[];
  pageTitle: string = "Book Appointment";
  constructor(private _datepipe : DatePipe ,private _route: Router, private _aroute: ActivatedRoute ,private _appointmentService: AppointmentService) { 
    this.bookAptDatepick = Object.assign({},{
      dateInputFormat : 'DD/MM/YYYY'
    });
  }

  ngOnInit(): void {
    this._appointmentService.getHospitals().subscribe(
      (data:any) => {
        console.log(data);
        this.hospitals = data;
      },
      (error) => {
        console.log(error);
      }
    );
  this.appointid = this._aroute.snapshot.paramMap.get('aid');
  console.log('aid :'+ this.appointid);
    if(this.appointid !== null){
      this.pageTitle = "Update Appointment";
      this._appointmentService.getAppointment(this.appointid).subscribe(
        (res:any) => {console.log(res);
          this.onHospitalChange(res.hospital);
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
      hospital : new FormControl(null ,Validators.required),
      doctor : new FormControl(null, Validators.required),
      doa : new FormControl('',Validators.required),
      time : new FormControl('',[Validators.required, Validators.pattern('^(([0]?[9]?|[1]?[0-9]|2[0]):[0-5][0-9])|(21:00)$') ]),
      state : new FormControl('A')
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
    this.AppointmentForm.controls.state.setValue('A');
  }

  OnCancelClick(){
    this._route.navigate(['ViewAppointments']);
  }

  onHospitalChange(id:any){console.log(id);
    if(id !== 'null'){
      this._appointmentService.getDoctors(id).subscribe(
        (response:any) => {console.log(response);
          this.doctors = response;
        
        //this._route.navigate(['home/viewappointment']);
      },
        (error:any) => {
            console.log(error);
          }
      );}
    else{
      this.AppointmentForm.controls.doctor.setValue(null);
      this.AppointmentForm.controls.hospital.setValue(null);
    }
  }
  
}
