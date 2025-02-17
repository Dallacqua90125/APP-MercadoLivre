import { Component } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product/product.service';
import { response } from 'express';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: Product[] = [];
  currentPage = 0;
  itemsPerPage = 15;

  constructor(private productService: ProductService){}

  ngOnInit(): void{
    this.productService.GetProducts().subscribe(response => {
      this.products = response;
    })
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
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


}
