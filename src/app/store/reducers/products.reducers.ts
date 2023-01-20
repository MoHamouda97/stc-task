import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, State } from "@ngrx/store";
import { ProductsActions } from "../products/products.action-types";

export interface ProductsState extends EntityState<any> {
    ProductsLoaded: boolean
}

export const adapter = createEntityAdapter<any>({
    selectId: products => products.id
})

export const initProductsState = adapter.getInitialState({
    ProductsLoaded: false
})

export const ProductsReducer = createReducer(
    initProductsState,
    on(ProductsActions.productsLoaded, (state, action) => adapter.addMany(action.products, {...state, ProductsLoaded: true})),
    on(ProductsActions.productUpdated, (state, action) => adapter.updateOne(action.update, state)),
    on(ProductsActions.productDeleted, (state, action) => adapter.removeOne(action.id, state))    
)

export const {selectAll} = adapter.getSelectors();