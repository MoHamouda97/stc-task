import { Route } from "@angular/router";
import { AdminGuard } from "./core/auth/guards/admin-guard";
import { LoginGuard } from "./core/auth/guards/login-guard";
import { UserGuard } from "./core/auth/guards/user-guard";
import { LayoutComponent } from "./layout/layout.component";
import { AdminComponent } from "./modules/admin/admin.component";
import { AllProductsResolver } from "./modules/admin/resolvers/all-products.resolver";
import { SignInComponent } from "./modules/auth/sign-in/sign-in.component";
import { AllCategoriesResolver } from "./modules/user/resolvers/all-categories.resolver";
import { UserComponent } from "./modules/user/user.component";

export const appRoutes: Route[] = [
    // Redirect empty path to 'sign-in'
    {path: '', pathMatch : 'full', redirectTo: 'sign-in'}, 
    
    {
        path: '',
        component: SignInComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: 'sign-in',
                loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.SignInModule)
            }
        ]
    },

    {
        path: 'app',
        component: LayoutComponent,
        children: [
            // Admin route
            {
                path: 'admin',
                component: AdminComponent,
                canActivate: [AdminGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
                    }
                ]
            },
            
            // User route
            {
                path: 'user',
                component: UserComponent,
                canActivate: [UserGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),                     
                    }
                ],
                resolve: {
                    data: AllCategoriesResolver,
                    products: AllProductsResolver
                }                   
            }             
        ]
    }  
] 