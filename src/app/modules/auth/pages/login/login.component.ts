import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../products/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule]
})


export class LoginComponent {
 fb = inject(FormBuilder);
 hasError = signal(false);
 isPosting = signal(false);

 loginForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
 });

 onSubmit() {
  if(this.loginForm.invalid) {
    this.hasError.set(true)
    setTimeout(() => {
      this.hasError.set(false)
    }, 2000);
    return;
  }

  const {email = '', password = ''} = this.loginForm.value;

  console.log({email, password});
 }
}