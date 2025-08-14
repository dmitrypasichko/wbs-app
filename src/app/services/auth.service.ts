import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

type TokenResponse = { accessToken: string, refreshToken: string, username: string, roles: string[] };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = 'http://localhost:8080/api';
  private readonly accessKey = 'access_token';
  private readonly refreshKey = 'refresh_token';
  private readonly rolesKey = 'roles';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<TokenResponse>(`${this.api}/auth/login`, { username, password });
  }

  register(username: string, email: string, password: string) {
    return this.http.post<TokenResponse>(`${this.api}/auth/register`, { username, email, password });
  }

  refresh() {
    const rt = this.getRefreshToken();
    return this.http.post<TokenResponse>(`${this.api}/auth/refresh`, { refreshToken: rt });
  }

  saveTokens(res: TokenResponse) {
    localStorage.setItem(this.accessKey, res.accessToken);
    localStorage.setItem(this.refreshKey, res.refreshToken);
    localStorage.setItem(this.rolesKey, JSON.stringify(res.roles || []));
  }

  logout() {
    const rt = this.getRefreshToken();
    if (rt) {
      this.http.post(`${this.api}/auth/logout`, { refreshToken: rt }).subscribe({ complete: () => {} });
    }
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.rolesKey);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null { return localStorage.getItem(this.accessKey); }
  getRefreshToken(): string | null { return localStorage.getItem(this.refreshKey); }

  getRoles(): string[] {
    const raw = localStorage.getItem(this.rolesKey);
    try { return raw ? JSON.parse(raw) : []; } catch { return []; }
  }

  isLoggedIn(): boolean { return !!this.getAccessToken(); }
}
