import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent {

  constructor (private router: Router) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/sign-in'])
  }

}
