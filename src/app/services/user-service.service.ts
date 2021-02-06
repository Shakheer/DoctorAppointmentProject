import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http : HttpClient) { }

  registerUser(user: any)
  {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    let body = JSON.stringify(user);
    return this._http.post('http://localhost:53230/api/User/RegisterUser',body,{'headers': headers});
  }

  authenticateUser(user: any)
  {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    let body = JSON.stringify(user);
    return this._http.post('http://localhost:53230/api/User/Login',body,{headers: headers});
  }

}
