import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="submit()">
      <div class="card">
        <label>Username</label>
        <input [(ngModel)]="username" name="username" required />
        <label>Email</label>
        <input [(ngModel)]="email" name="email" type="email" required />
        <label>Password</label>
        <input [(ngModel)]="password" name="password" type="password" required />
        <button type="submit">Create account</button>
        <p *ngIf="error" style="color:#c00">{{error}}</p>
      </div>
    </form>
  `
})
export class RegisterComponent {
  username=''; email=''; password=''; error='';
  constructor(private auth: AuthService, private router: Router) {}
  submit() {
    this.error = '';
    this.auth.register(this.username, this.email, this.password).subscribe({
      next: res => { this.auth.saveTokens(res); this.router.navigate(['/catalog']); },
      error: err => this.error = err?.error?.message || 'Registration failed'
    });
  }
}
