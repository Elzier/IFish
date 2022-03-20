import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AdminLayolutComponent } from './shared/components/admin-layolut/admin-layolut.component'
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'
import { AuthService } from './shared/services/auth.service'
import { AuthGuard } from './shared/services/auth.guard'


@NgModule({
  declarations: [
    AdminLayolutComponent,
    CreatePageComponent,
    EditPageComponent,
    DashboardPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayolutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
          {path: 'post/:id', component: EditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  providers: [AuthGuard]
})

export class AdminModule {

}
