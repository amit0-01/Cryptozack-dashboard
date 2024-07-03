import { StorageHelper } from './../../../../helpers/storage';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInRequest } from 'src/app/helpers/app.interface';
import { REG_EX } from 'src/app/helpers/constants';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(REG_EX.email)]),
    password: new FormControl('', Validators.required),
  });
  showLoader = false;
  controls: any;
  showPassword: boolean = false;
  passwordType: any = "password";

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.controls = this.loginForm.controls;
  }

  ngOnInit(): void {
  }      


  signIn() {
    this.router.navigate(['/admin/dashboard']);
    this.showLoader = true;
    console.log(this.loginForm.valid)
    if (this.loginForm.valid) {
      // const email = this.loginForm.value.email
      // const password = this.loginForm.value.password
      // this.authService.signIn(email, password).subscribe((result) => {
      //   StorageHelper.userInfo = result;
      // })
    }
  }

}




