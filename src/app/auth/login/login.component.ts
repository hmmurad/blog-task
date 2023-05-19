import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl: any;
  user: any;
  errMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }
// add login
  onSubmit() {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.auth.login(email, password).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.successMessage = 'Login successfull!';
        setTimeout(() => {
          this.router.navigateByUrl(this.returnUrl);
          this.successMessage = '';
        }, 1000);
        console.log(res);
      } else {
        this.errMessage = 'Wrong credentials!';
        setTimeout(() => {
          this.errMessage = '';
        }, 1000);
      }
    });
  }
}
