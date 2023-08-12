import { Component, OnInit, effect } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { CategoriesService } from './services/categories.service';
import { ProductsSignals } from 'src/app/shared/signals/products.signal';
import { ProductsService } from '../admin/services/products.service';
import { Product } from 'src/app/shared/types/product';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  $categories: Observable<string[]> = this.service.$categories;
  products: Product[];

  constructor (
    private service: CategoriesService,
    private productsService: ProductsService,
    private signals: ProductsSignals) {
      this.registerSignalChanges();
  }  

  ngOnInit(): void {
    this.getProducts();
  } 

  /**
   * This function just for showing how to detect signal changes
   */
  registerSignalChanges(): void {
    effect(() => {
      this.products = this.signals.products();
    })
  }

  async getProducts(): Promise<void> {
    if (this.signals.products().length === 0) {
      const products = await lastValueFrom(this.productsService.getProducts());
      this.signals.products.set(products);    
    }
  }
  
  async getProductsByCategory(cat: string): Promise<void> {
    this.products = (cat === 'all') ? this.signals.products() : await lastValueFrom(this.service.getProductsByCategory(cat));
  }  
}
