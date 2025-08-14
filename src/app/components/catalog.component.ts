import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-catalog',
  imports: [CommonModule],
  template: `
    <h2>Catalog</h2>
    <div *ngFor="let item of items" class="card">
      <div><b>{{item.name}}</b></div>
      <div>Zone: {{item.zone}}</div>
    </div>
  `
})
export class CatalogComponent {
  items:any[]=[];
  constructor(private http: HttpClient) {
    this.http.get<any[]>('http://localhost:8080/api/catalog').subscribe(d => this.items = d);
  }
}
