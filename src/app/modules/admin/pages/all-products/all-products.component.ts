import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllProducts } from 'src/app/store/products/products.selectors';
import { productDeleted } from 'src/app/store/products/products.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AllProductsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'category', 'image', 'price', 'action'];
  dataSource: any;
  $destroy: Subject<null> = new Subject<null>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (
    private store: Store<AppState>,
    private service: ProductsService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Get all products from store
   */
  getProducts(): void {
    this.store
    .pipe(
      takeUntil(this.$destroy),
      select(selectAllProducts)
    ).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  delete(id: number): void {
    this.service.deleteProduct(id).subscribe(
      () => {
        this.store.dispatch(productDeleted({id}))
        this.toastr.success('Product deleted successfully!');        
      }
    )
  }
  
  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }     
}
