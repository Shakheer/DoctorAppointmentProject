import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments-home',
  templateUrl: './appointments-home.component.html',
  styleUrls: ['./appointments-home.component.css']
})
export class AppointmentsHomeComponent implements OnInit {
  username:any;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("userName");
  }
  onSignoutClick(){
    localStorage.removeItem("token");
    this.route.navigate(['usersignin'])
  }
}
