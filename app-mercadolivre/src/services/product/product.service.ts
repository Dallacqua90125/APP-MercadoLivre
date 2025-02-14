import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.ApiUrl}ProductModels`;
  constructor( private http: HttpClient ) { }

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
