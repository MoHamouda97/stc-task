import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${environment.api}/products`)
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`${environment.api}/products/${id}`)
  }

  add(product: any): Observable<any> {
    return this.http.post(`${environment.api}/products`, product)
  }

  update(product: any, id: number): Observable<any> {
    return this.http.put(`${environment.api}/products/${id}`, product)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/products/${id}`)
  }

}
