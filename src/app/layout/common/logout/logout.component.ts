import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {

  constructor (private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/sign-in'])
  }

}
