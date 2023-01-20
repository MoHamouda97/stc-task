import { AllProductsComponent } from './components/all-products/all-products.component';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { adminRoutes } from './admin.routing';
import { ProductsService } from './services/products.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffect } from 'src/app/store/products/products.effect';
import { ProductsReducer } from 'src/app/store/reducers/products.reducers';

@NgModule({
    declarations: [
        AdminComponent,
        AllProductsComponent,
        ProductFormComponent
    ],
    imports: [
        RouterModule.forChild(adminRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
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
