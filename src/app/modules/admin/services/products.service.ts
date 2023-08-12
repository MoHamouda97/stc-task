import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Stats } from '../types/stats';
import { stats } from '../const/stats';
import { Product } from 'src/app/shared/types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  $stats: Observable<Stats[]> = of(stats);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}/products`).pipe(
      catchError(_ => of([]))
    )
  }

  getProduct(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${environment.api}/products/${id}`).pipe(
      catchError(_ => of(null))
    )
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.api}/products`, product).pipe(
      catchError(_ => of(null))
    )
  }

  updateProduct(product: Product, id: number): Observable<any> {
    return this.http.put(`${environment.api}/products/${id}`, product).pipe(
      catchError(_ => of(null))
    )
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/products/${id}`).pipe(
      catchError(_ => of(null))
    )
  }

}
