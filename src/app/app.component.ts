//* There are 2 ways to create Form Model 
//*   1. FormGroup + FormControl
//*   2. FormBuilder - short refactored way to create Form Model

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private _formBuilder: FormBuilder) { }

  //* 1.
  //* whole form - FormGroup, one field component of form - FormControl, they together comprise of FormModel
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Rajeev'), //* We can set default value
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   //* Using nested FormGroup to group city, state and postalCode in address
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // })

  //* 2.
  registrationForm = this._formBuilder.group({
    userName: ['Rajeev'],
    password: [''],
    confirmPassword: [''],
    address: this._formBuilder.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  })

  loadAPIData() {
    //* .setValue can be used to set all the form control values, while .patchValue can be used if we want to set only few of the form control values
    this.registrationForm.patchValue({
      userName: 'John',
      // password: 'test',
      // confirmPassword: 'test',
      address: {
        city: 'Gurugram',
        state: 'Haryana',
        postalCode: '122003'
      }
    })
  }
}
