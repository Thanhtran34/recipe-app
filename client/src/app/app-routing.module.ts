import { CalculatorComponent } from './calculator/calculator.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path: 'recipe-list',
    component: RecipeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-recipe/:id',
    component: EditRecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: HomeComponent,
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
