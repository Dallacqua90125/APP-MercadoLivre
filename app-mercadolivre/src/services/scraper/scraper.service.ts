import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  private apiUrl = `${environment.ApiUrl}ProductModels/run-scraper`; // Ajuste para o endpoint correto

  constructor(private http: HttpClient) {}

  runScraper(produto: string): Observable<any> {
    return this.http.post(this.apiUrl, { produto });
  }
}
