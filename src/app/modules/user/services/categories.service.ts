import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { Product } from 'src/app/shared/types/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  $categories: Observable<string[]> = this.http.get<string[]>(`${environment.api}/products/categories`).pipe(
    share({
      connector: () => new ReplaySubject(),
      resetOnRefCountZero: true,
      resetOnComplete: false,
      resetOnError: true
    }),
    catchError(_ => of([]))
  )

  constructor(private http: HttpClient) { }

  getProductsByCategory(cat: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}/products/category/${cat}`).pipe(
      catchError(_ => of([]))
    )
  }

}
