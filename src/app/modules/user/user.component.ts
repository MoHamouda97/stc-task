import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { selectAllProducts } from 'src/app/store/products/products.selectors';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  categories: any[];
  products: any[];
  storedProducts: any[];
  unsubscribeAll: Subject<any> = new Subject<any>();

  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute, 
    private service: CategoriesService) {}  

  ngOnInit(): void {
    this.store.pipe(
      takeUntil(this.unsubscribeAll),
      select(selectAllProducts)
      ).subscribe(
      (data: any) => {
        this.storedProducts = data;
        this.products = data;
      }
    )

    this.activatedRoute.data.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe( 
      (data: any) => {
        this.categories = data.data        
      }
    )
  } 
  
  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  } 
  
  async getByCategory(cat: string) {
    this.products = (cat === 'all') ? this.storedProducts : await this.service.getOne(cat).toPromise();
  }
}
