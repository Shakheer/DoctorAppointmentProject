import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentsModel } from 'src/app/Models/appointments-model';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {
  public appointments : AppointmentsModel[];
  constructor(private _appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAllAppointments()
  }
  getAllAppointments(){
    this._appointmentService.getAppointments().subscribe(
      (response:any) => {console.log(response);
        this.appointments = response;
        console.log(this.appointments);
      },
      (error:any) => {
          console.log(error);
      }
    );
  }
  onEditClick(e){
    var v = this.appointments[e]
    console.log(v);
    
  }
}
