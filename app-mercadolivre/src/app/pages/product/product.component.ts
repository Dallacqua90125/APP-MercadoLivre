import { Component } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: Product[] = [];
  filteredProductsList: Product[] = [];

  currentPage = 0;
  itemsPerPage = 30;

  minPrice: number | null = null;
  maxPrice: number | null = null;
  searchTerm: string = '';
  isFiltersVisible = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.GetProducts().subscribe(response => {
      this.products = response;
      this.filteredProductsList = [...this.products];
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProductsList.length / this.itemsPerPage);
  }

  paginatedProducts() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProductsList.slice(startIndex, endIndex);
  }

  applyFilters() {
    this.filteredProductsList = this.products.filter(product => {
      const price = parseFloat(product.price.replace('R$', '').trim().replace(/\./g, '').replace(',', '.'));

      const meetsMinPrice = this.minPrice !== null ? price >= this.minPrice : true;
      const meetsMaxPrice = this.maxPrice !== null ? price <= this.maxPrice : true;

      const meetsSearchTerm = this.searchTerm
        ? product.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return meetsMinPrice && meetsMaxPrice && meetsSearchTerm;
    });

    this.currentPage = 0;
  }


  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  clearFilters() {
    this.minPrice = null;
    this.maxPrice = null;
    this.searchTerm = ''; // Limpa o termo de pesquisa
    this.filteredProductsList = [...this.products];
    this.currentPage = 0;
  }

  toggleFilters() {
    this.isFiltersVisible = !this.isFiltersVisible;
  }
}
