import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { ProfileComponent } from './components/profile.component';
import { CatalogComponent } from './components/catalog.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'catalog' }
];
