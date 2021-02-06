import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsHomeComponent } from './appointments-home/appointments-home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { ViewAppointmentsComponent } from './appointments-home/view-appointments/view-appointments.component';
import { BookAppointmentsComponent } from './appointments-home/book-appointments/book-appointments.component';

const routes: Routes = [
  {path : 'home' , component : AppointmentsHomeComponent,
    children:
    [
      {path: '',
        children:[
          {path:'viewappointment', component: ViewAppointmentsComponent },
          {path:'bookappointment', component: BookAppointmentsComponent },
          {path:'updateappointment/:aid', component: BookAppointmentsComponent },
        ]
      }
    ]
},
  {path : 'ViewAppointments', component : AppointmentsHomeComponent,
  children:[{path:'', component: ViewAppointmentsComponent }]},
  {path : 'BookAppointments', component : AppointmentsHomeComponent,
  children:[{path:'', component: BookAppointmentsComponent },
  {path:'BookAppointments/update/:id', component: BookAppointmentsComponent }
  ]},
  {path : 'usersignup', component : UserComponent, 
   children: [{path: '', component: SignUpComponent}]},
  {path : 'usersignin', component : UserComponent,
   children: [{path: '', component: SignInComponent}]},
   {path: '', redirectTo:'/usersignin', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
