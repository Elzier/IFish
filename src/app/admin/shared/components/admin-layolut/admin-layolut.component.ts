import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-admin-layolut',
  templateUrl: './admin-layolut.component.html',
  styleUrls: ['./admin-layolut.component.scss']
})
export class AdminLayolutComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

  logout($event: MouseEvent) {
    $event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
