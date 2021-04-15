import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

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
    this.spinner.show();
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    (res: any) => {
     if (this.authService.isLoggedIn && res) {
       finalize(() => this.spinner.hide())
      } else this.spinner.hide();
    }
  }
}
