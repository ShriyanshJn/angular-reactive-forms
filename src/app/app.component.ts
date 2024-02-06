//* There are 2 ways to create Form Model 
//*   1. FormGroup + FormControl
//*   2. FormBuilder - short refactored way to create Form Model

import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, RequiredValidator, Validator, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  registrationForm!: FormGroup

  get userName() {
    return this.registrationForm.get('userName')
  }

  get email() {
    return this.registrationForm.get('email')
  }

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

  ngOnInit(): void {
    //* 2.
    this.registrationForm = this._formBuilder.group({
      // userName: [defaultValue,[Validations]]
      userName: ['Rajeev', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this._formBuilder.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    }, { validator: PasswordValidator })

    this.registrationForm.get('subscribe')?.valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email')
      if (checkedValue) {
        email?.setValidators(Validators.required)
      } else {
        email?.clearValidators()
      }
      // to ensure correct status is reflected
      email?.updateValueAndValidity()
    })
  }

  loadAPIData() {
    //* .setValue can be used to set all the form control values, while .patchValue can be used if we want to set only few of the form control values
    this.registrationForm.patchValue({
      // userName: 'John',
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
