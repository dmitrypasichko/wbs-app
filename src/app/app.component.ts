import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <nav>
      <a routerLink="/catalog">Catalog</a>
      <a routerLink="/profile" *ngIf="auth.isLoggedIn()">Profile</a>
      <a routerLink="/login" *ngIf="!auth.isLoggedIn()">Login</a>
      <a routerLink="/register" *ngIf="!auth.isLoggedIn()">Register</a>
      <a href="#" (click)="logout()" *ngIf="auth.isLoggedIn()">Logout</a>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  logout() { this.auth.logout(); }
}
