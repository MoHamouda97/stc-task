import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
import { ProductsService } from 'src/app/modules/admin/services/products.service';
import { ProductsActions } from './products.action-types';
import { productsLoaded } from './products.actions';

@Injectable()

export class ProductsEffect {

    loadProducts$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ProductsActions.getProducts),
                concatMap(action =>  {
                    return this.service.getProducts()
                }),
                map(products => productsLoaded({products}))
            )
    )

    constructor(
        private actions$: Actions, 
        private service: ProductsService) {}

}