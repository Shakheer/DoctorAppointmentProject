import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  // function to validate that dob should be 16 years old
  static dobValidator(control: AbstractControl) {
    let currentDate = new Date();
    if (control.value) {
        let dob = new Date(control.value);
        let dobYear = dob.getFullYear();
        let maxDobYear = currentDate.getFullYear() - 18;
        //console.log(dobYear, maxDobYear)
        if (maxDobYear < dobYear) {
            return { 'invalidDob': true };
        }
        else {
            return null
        }
    }
}
}
