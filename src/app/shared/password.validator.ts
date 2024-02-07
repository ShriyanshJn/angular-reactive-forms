import { AbstractControl } from "@angular/forms";

// With control we get access of the whole form group
export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value
    const confirmPassword = control.get('confirmPassword')?.value
    // if any of the controls is untouched / uninteracted by the user
    if (control.get('password')?.pristine || control.get('confirmPassword')?.pristine) return null
    return password && confirmPassword && password != confirmPassword ? { 'misMatch': true } : null
}