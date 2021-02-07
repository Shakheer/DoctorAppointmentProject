import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AppointmentsHomeComponent } from './appointments-home/appointments-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ViewAppointmentsComponent } from './appointments-home/view-appointments/view-appointments.component';
import { BookAppointmentsComponent } from './appointments-home/book-appointments/book-appointments.component'
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './services/user-service.service';
import { AppointmentService } from './services/appointment.service';
import { DatePipe } from '@angular/common';
import { JwtModule } from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    AppointmentsHomeComponent,
    ViewAppointmentsComponent,
    BookAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {return localStorage.getItem('token')},
        allowedDomains: ["http://localhost:4200/"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    })
  ],
  providers: [UserServiceService,AppointmentService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
