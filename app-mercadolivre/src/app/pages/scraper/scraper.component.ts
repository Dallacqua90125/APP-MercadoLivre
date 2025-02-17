import { Component } from '@angular/core';
import { ScraperService } from '../../../services/scraper/scraper.service';

@Component({
  selector: 'app-scraper',
  standalone: false,
  templateUrl: './scraper.component.html',
  styleUrls: ['./scraper.component.css']
})
export class ScraperComponent {
  produto: string = '';
  loading = false;
  message = '';

  constructor(private scraperService: ScraperService) {}
  
  runScraper() {
    if (!this.produto.trim()) {
      this.message = 'Digite um produto!';
      return;
    }

    this.loading = true;
    this.message = 'Buscando dados...';

    this.scraperService.runScraper(this.produto).subscribe({
      next: (response) => {
        this.message = response.message;
        this.loading = false;
      },
      error: (error) => {
        this.message = 'Erro ao executar scraper: ' + error.message;
        this.loading = false;
      }
    });
  }
}
