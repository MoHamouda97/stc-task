import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { productUpdated } from 'src/app/store/products/products.actions';
import { Update } from '@ngrx/entity';
import { ProductForm } from './form/product-form';
import { Product } from 'src/app/shared/types/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent extends ProductForm implements OnInit, OnDestroy {
  productId: any = this.activatedRoute.snapshot.paramMap.get('id');
  productForm: FormGroup = this.createProductForm();
  $destroy: Subject<null> = new Subject<null>();
  
  constructor ( 
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,   
    private service: ProductsService,
    private toastr: ToastrService) {
      super();
    }

  ngOnInit(): void {
    this.getRouteData();
  }

  /**
   * Get product returned from resolver
   */
  getRouteData(): void {
    if (this.productId) {
      this.activatedRoute.data.pipe(
        takeUntil(this.$destroy)
      ).subscribe( 
        (data: any) => this.productForm.patchValue(data.product)
      )
    }
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const product = this.productForm.getRawValue();

      this.productForm.disable();

      this.service.addProduct(product).subscribe(
        () => {
          this.toastr.success('New product added successfully!!');
          this.productForm.enable();
          this.productForm.reset();
        }
      )
    }
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const update: Update<Product> = {
        id: this.productId,
        changes: this.productForm.value
      }

      this.productForm.disable();

      this.service.updateProduct(update.changes as Product, update.id as number).subscribe(
        () => {      
          this.store.dispatch(productUpdated({update}))
          this.toastr.success('Product updated successfully!!');
          this.productForm.enable();
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }    
}
