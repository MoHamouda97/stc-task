import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    })
  }

  signIn() {
    if (this.signInForm.valid) {
      this.signInForm.disable();

      const {username, password} = this.signInForm.value

      if (username.toLowerCase() === 'user' && password.toLowerCase() === 'user' || 
          username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
            localStorage.setItem('accessAs', this.signInForm.value.username);
            this.router.navigate([`/app/${this.signInForm.value.username}`]);

            return
      }
      
      this.toastr.warning('username and/or password is not correct');
      this.signInForm.enable();
    }
  }

}
