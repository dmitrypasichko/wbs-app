import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
    <h2>My Profile</h2>
    <div class="card">
      <div><b>Username:</b> {{data?.username}}</div>
      <div><b>Roles:</b> {{(data?.roles || []).join(', ')}}</div>
    </div>
  `
})
export class ProfileComponent {
  data:any;
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/api/auth/me').subscribe(d => this.data = d);
  }
}
