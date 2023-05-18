import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordValidator } from '../passwordMatch.validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: passwordValidator }
    );
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;
    if (this.registerForm.valid) {
      this.auth.register(username, password).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
