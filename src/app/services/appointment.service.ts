import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentsModel } from '../Models/appointments-model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private _http : HttpClient) { }

  bookAppointment(appointment: any) 
  {
    let headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization','Bearer '+localStorage.getItem('token'));
    let body = JSON.stringify(appointment);
    return this._http.post('http://localhost:53230/api/Appointment/BookAppointment',body,{'headers': headers});
  }

  updateAppointment(aid:string, appointment: any) 
  {
    let headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization','Bearer '+localStorage.getItem('token'));
    let body = JSON.stringify(appointment);
    console.log(body);
    return this._http.post('http://localhost:53230/api/Appointment/UpdateAppointment/'+aid, body, {'headers': headers});
  }

  getAppointments()
  {
    let headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'));
    return this._http.get('http://localhost:53230/api/Appointment/GetAppointments',{'headers': headers});
  }
  getAppointment(aid:string)
  {
    let headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'));
    return this._http.get('http://localhost:53230/api/Appointment/GetAppointment/'+aid,{'headers': headers});
  }
}
