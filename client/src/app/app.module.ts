import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './shared/service/auth.service';
import { AuthconfigInterceptor } from './interceptors/authconfig.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './toolbar/header/header.component'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule } from '@angular/material/form-field'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import { DashboardComponent } from './toolbar/dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeAddComponent } from './recipes/recipe-add/recipe-add.component';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { HandleErrorInterceptor } from './interceptors/handle-error.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    RecipesComponent,
    RecipeComponent,
    RecipeAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RxReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoggedOutGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthconfigInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: HandleErrorInterceptor, 
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
