import { Route } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AllProductsResolver } from './resolvers/all-products.resolver';
import { SingleProductResolver } from './resolvers/single-product.resolver';

export const adminRoutes: Route[] = [
    {
        path: '',
        component: AllProductsComponent,
        resolve: {
            data: AllProductsResolver
        }
    },
    {
        path: 'add',
        component: ProductFormComponent
    },
    {
        path: 'edit/:id',
        component: ProductFormComponent,
        resolve: {
            data: SingleProductResolver
        }
    },
];
