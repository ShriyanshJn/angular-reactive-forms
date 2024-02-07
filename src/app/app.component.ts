//* FormArray - Array, Dynamic Controls ; FormGroup - Object

//* There are 2 ways to create Form Model 
//*   1. FormGroup + FormControl
//*   2. FormBuilder - short refactored way to create Form Model

import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, RequiredValidator, Validator, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _registrationService: RegistrationService) { }

  registrationForm!: FormGroup

  get userName() {
    return this.registrationForm.get('userName')
  }

  get email() {
    return this.registrationForm.get('email')
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray
  }

  addAlternateEmail() {
    this.alternateEmails.push(this._formBuilder.control(''))
    // console.log(this.alternateEmails)
  }

  onSubmit() {
    console.log(this.registrationForm.value)
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.log('Error!', error)
      )
  }

  //* 1.
  //* whole form - FormGroup, one field component of form - FormControl, they together comprise of FormModel
  // this.registrationForm = new FormGroup({
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
      city: [''],
      state: [''],
      postalCode: [''],
      alternateEmails: this._formBuilder.array([])
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

      city: 'Gurugram',
      state: 'Haryana',
      postalCode: '122003'

    })
  }
}
