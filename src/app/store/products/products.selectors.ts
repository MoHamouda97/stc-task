import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromProducts from "../reducers/products.reducers";
import { ProductsState } from "../reducers/products.reducers";

export const selectProductsState = createFeatureSelector<ProductsState>('Products');

export const selectAllProducts = createSelector(
    selectProductsState,
    fromProducts.selectAll
)

export const selectProduct = createSelector(
    selectAllProducts,
    (products: any, props: any) => products.filter((product: any) => product.id === props.id)
)

export const isProductsLoaded = createSelector(
    selectProductsState,
    state => state.ProductsLoaded
)