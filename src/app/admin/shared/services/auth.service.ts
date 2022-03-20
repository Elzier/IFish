import { Injectable } from '@angular/core'
import { FbAuthResponse, User } from '../../../shared/interfaces'
import { catchError, Observable, Subject, tap, throwError } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import * as _ from 'lodash'

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token() {
    const expString = localStorage.getItem('expiresIn')
    if (!expString) {
      this.logout()
      return null
    }
    const expDate = new Date(expString)

    if (new Date() >= expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('authTokenId')
  }

  private static setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('authTokenId', response.idToken)
      localStorage.setItem('expiresIn', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

  handleError(error: HttpErrorResponse) {
    const {message} = error.error.error
    const processedMessage = _.capitalize(message.toLowerCase().replace(/_/g, ' '))
    this.error$.next(processedMessage)
    return throwError(() => error)
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post<FbAuthResponse>( `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(AuthService.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    AuthService.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
}
