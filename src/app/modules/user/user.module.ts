import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoriesService } from './services/categories.service';
import { UserComponent } from './user.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffect } from 'src/app/store/products/products.effect';
import { ProductsReducer } from 'src/app/store/reducers/products.reducers';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        UserComponent,
        ProductCardComponent
    ],
    imports: [
        RouterModule,
        EffectsModule.forFeature([
            ProductsEffect
        ]),
        StoreModule.forFeature('Products', ProductsReducer),         
        SharedModule
    ],
    providers: [
        CategoriesService
    ]
})
export class UserModule {}
