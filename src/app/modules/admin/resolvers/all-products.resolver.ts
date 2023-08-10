import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { finalize, first, Observable, tap } from "rxjs";
import { AppState } from "src/app/reducers";
import { getProducts } from "src/app/store/products/products.actions";
import { isProductsLoaded } from "src/app/store/products/products.selectors";

@Injectable({
    providedIn: 'any'
})

export class AllProductsResolver  {
    loading = false;

    constructor(private stroe: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
        return this.stroe
            .pipe(
                select(isProductsLoaded),
                tap((productsLoaded) => {
                    if (!this.loading && !productsLoaded) {
                        this.stroe.dispatch(getProducts());
                    }
                }),
                first(),
                finalize(() => this.loading = false)
            )
    }
}