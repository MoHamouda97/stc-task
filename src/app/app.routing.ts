import { Route } from "@angular/router";
import { LoginGuard } from "./core/auth/guards/login-guard";
import { LayoutComponent } from "./layout/layout.component";
import { AdminComponent } from "./modules/admin/admin.component";
import { AllProductsResolver } from "./modules/admin/resolvers/all-products.resolver";
import { SignInComponent } from "./modules/auth/sign-in/sign-in.component";
import { UserComponent } from "./modules/user/user.component";
import { AccessGuard } from "./core/auth/guards/access-guard";
import { NotFoundPageComponent } from "./modules/not-found-page/not-found-page.component";

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
                canActivate: [AccessGuard],
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
                canActivate: [AccessGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),                     
                    }
                ],
                resolve: {
                    products: AllProductsResolver
                }                   
            }             
        ]
    },
    
    // 404
    {
        path: '**',
        loadComponent: () => import('./modules/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
    }
] 