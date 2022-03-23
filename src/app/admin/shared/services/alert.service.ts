import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export type AlertType = 'success' | 'warning' | 'danger'

export interface Alert {
  type: AlertType,
  text: string
}

@Injectable()
export class AlertService {

  public stream$ = new Subject<Alert>()

  success(text: string) {
    this.stream$.next({type: 'success', text})
  }
  warning(text: string) {
    this.stream$.next({type: 'warning', text})
  }
  danger(text: string) {
    this.stream$.next({type: 'danger', text})
  }
}
