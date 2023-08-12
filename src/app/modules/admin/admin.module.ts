import { AllProductsComponent } from './pages/all-products/all-products.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { adminRoutes } from './admin.routing';
import { ProductsService } from './services/products.service';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffect } from 'src/app/store/products/products.effect';
import { ProductsReducer } from 'src/app/store/reducers/products.reducers';
import { ProductsStatsComponent } from './components/products-stats/products-stats.component';

@NgModule({
    declarations: [
        AdminComponent,
        ProductsStatsComponent,
        AllProductsComponent,
        ProductFormComponent
    ],
    imports: [
        RouterModule.forChild(adminRoutes),
        EffectsModule.forFeature([
            ProductsEffect
        ]),
        StoreModule.forFeature('Products', ProductsReducer),        
        SharedModule
    ],
    providers: [
        ProductsService
    ]
})
export class AdminModule {}
