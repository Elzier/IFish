import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'


@Injectable({providedIn: 'root'})
export class FormValidationHelperService {

  constructor(private form: FormGroup) {}

  public touchedAndInvalidControl(controlName: string): boolean {
    return !!(this.form.get(controlName)?.touched && this.form.get(controlName)?. invalid)
  }

  public calcCntrlRemainChars(controlName: string): number {
    const passMinLength = this.form.get(controlName)?.errors?.['minlength']
    return passMinLength?.['requiredLength'] - passMinLength?.['actualLength']
  }
}
