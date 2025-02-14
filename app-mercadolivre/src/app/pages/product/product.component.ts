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

  constructor(private productService: ProductService){}

  ngOnInit(): void{
    this.productService.GetProducts().subscribe(response => {
      this.products = response;
    })
  }
}
