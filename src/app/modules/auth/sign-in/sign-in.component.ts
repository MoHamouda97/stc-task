import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignInForm } from './form/sign-in-form';
import { setSessionInfo } from 'src/app/shared/util/session-info';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent extends SignInForm {
  signInForm: FormGroup = this.createSignInForm();

  constructor(
    private router: Router, 
    private toastr: ToastrService) {
    super();
  }

  signIn() {
    if (this.signInForm.valid) {
      this.signInForm.disable();

      const {username, password} = this.signInForm.value

      if (username.toLowerCase() === 'user' && password.toLowerCase() === 'user' || 
          username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
            setSessionInfo('accessAs', username);

            this.router.navigate([`/app/${this.signInForm.value.username}`]);

            return;
      }
      
      this.toastr.warning('username and/or password is not correct');
      this.signInForm.enable();
    }
  }

}
