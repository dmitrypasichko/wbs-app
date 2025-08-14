import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="submit()">
      <div class="card">
        <label>Username</label>
        <input [(ngModel)]="username" name="username" required />
        <label>Password</label>
        <input [(ngModel)]="password" name="password" type="password" required />
        <button type="submit">Sign in</button>
        <p *ngIf="error" style="color:#c00">{{error}}</p>
        <p>Demo: admin/admin123, manager/manager123, user/user123</p>
        <a routerLink="/register">No account? Register</a>
      </div>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}
  submit() {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: res => { this.auth.saveTokens(res); this.router.navigate(['/catalog']); },
      error: err => this.error = err?.error?.message || 'Login failed'
    });
  }
}
