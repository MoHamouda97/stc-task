import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        // AuthService,
        // {
        //     provide : HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi   : true
        // }
    ]
})

export class AuthModule {}