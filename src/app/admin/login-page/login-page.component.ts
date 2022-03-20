import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { User } from '../../shared/interfaces'
import { AuthService } from '../shared/services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormValidationHelperService } from '../../shared/services/formValidationHelper.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  submitted = false
  message = ''

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  public formService: FormValidationHelperService

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.formService = new FormValidationHelperService(this.loginForm)
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramsMap) => {
      if (paramsMap.get('loginRequired')) {
        this.message = 'You must login first'
      }
    })
  }

  submit() {
    if (this.loginForm.invalid) {
      return
    }

    this.submitted = true
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.auth.login(user).subscribe(() => {
      this.loginForm.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    })
  }
}
