import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
},
{
    path: 'register',
    component: RegisterComponent
},
{
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
},
{
  path: 'logout',
  component: LoginComponent,
  canActivate: [LoggedOutGuard]
},
{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
