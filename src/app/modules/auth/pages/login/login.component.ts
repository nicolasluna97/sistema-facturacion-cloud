import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../products/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({  // ← FALTABA ESTE DECORADOR
  selector: 'app-login',
  standalone: true,  // ← FALTABA ESTA PROPIEDAD
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive], // ← Agregar CommonModule y ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 fb = inject(FormBuilder);
 hasError = signal(false);
 isPosting = signal(false);
 authService = inject(AuthService);
 router = inject(Router);

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

  this.authService.login(email!, password!).subscribe((success) => {
    if (success) {
      console.log('✅ Login exitoso, redirigiendo...');
      this.router.navigate(['/inventario']);
    } else {
      console.log('❌ Login fallido');
      this.hasError.set(true);
    }
  })
 }
}