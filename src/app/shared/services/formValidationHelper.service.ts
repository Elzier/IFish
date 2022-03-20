import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'


@Injectable({providedIn: 'root'})
export class FormService {

  constructor(public form: FormGroup) {

  }

  public touchedAndInvalidControl(controlName: string): boolean {
    return !!(this.form.get(controlName)?.touched && this.form.get(controlName)?. invalid)
  }

  public calcPasswordRemainChars(controlName: string): number {
    const passMinLength = this.form.get(controlName)?.errors?.['minlength']
    return passMinLength?.['requiredLength'] - passMinLength?.['actualLength']
  }
}
