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

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productId: any;
  productForm: FormGroup;
  unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor ( 
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,   
    private service: ProductsService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.createForm();

    if (this.productId) {
      this.activatedRoute.data.pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe( 
        (data: any) => this.productForm.patchValue(data.data)
      )
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }  

  createForm(): void {
    this.productForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl('https://i.pravatar.cc'),
      category: new FormControl(null, Validators.required),
    })
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const product = this.productForm.getRawValue();

      this.productForm.disable();

      this.service.add(product).subscribe(
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
      const update: Update<any> = {
        id: this.productId,
        changes: this.productForm.value
      }

      this.productForm.disable();

      this.service.update(update.changes, update.id as number).subscribe(
        () => {      
          this.store.dispatch(productUpdated({update}))
          this.toastr.success('Product updated successfully!!');
          this.productForm.enable();
        }
      )
    }
  }
}
