import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LoggedIn!: boolean;

  constructor(
      public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.LoggedIn = this.authService.isLoggedIn;
  }

}
