import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.hide();
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    (res: any) => {
     if (this.authService.isLoggedIn && res) {
      this.spinner.show()
      } else this.spinner.hide();
    }
  }
}
