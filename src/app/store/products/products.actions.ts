import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

export const getProducts = createAction(
    "[Admin Resolver] Get Products"
);

export const productsLoaded = createAction(
    "[Load Products Effect] Products Loaded",
    props<{products: any[]}>()
);

export const productUpdated = createAction(
    "[Update product] Product Updated",
    props<{update: Update<any>}>()
);

export const productDeleted = createAction(
    "[Delete product] Product Deleted",
    props<{id: number}>()
);