import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
  templateUrl: './all-products.component.html'
})

export class AllProductsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'category', 'image', 'price', 'action'];
  dataSource: any;
  unsubscribeAll: Subject<any> = new Subject<any>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (
    private store: Store<AppState>,
    private service: ProductsService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.store
    .pipe(
      takeUntil(this.unsubscribeAll),
      select(selectAllProducts)
    ).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }   

  delete(id: number) {
    this.service.delete(id).subscribe(
      () => {
        this.store.dispatch(productDeleted({id}))
        this.toastr.success('Product deleted successfully!');        
      }
    )
  }  
}
