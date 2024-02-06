//* CUSTOM VALIDATION

import { AbstractControl, ValidatorFn } from "@angular/forms";

//* If username is forbidden i.e matched admin we return key: value pair else if validation succeeds we return null

//* disadvantage of validator fx is that it can only accept one param (FormControl)
// export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
// if username form control has any substring 'admin' then we set forbiddenName flag to true else we set it to false
//     const forbiddenName = /admin/.test(control.value)
//     return forbiddenName ? { 'forbiddenName': { value: control.value } } : null
// }

// * to overcome above disadvantage we use Factory function, we get access of whole of the registration form
export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // if username form control has any substring 'admin' then we set forbiddenName flag to true else we set it to false
        // const forbidden = /admin/.test(control.value)
        const forbidden = forbiddenName.test(control.value)
        return forbidden ? { 'forbiddenName': { value: control.value } } : null
    }
}